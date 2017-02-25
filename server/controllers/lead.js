import series from 'async/series'
import parallel from 'async/parallel'
import Lead from 'Server/models/Lead'
import Contact from 'Server/models/Contact'

export const _getLeads = (cb) => {
  Lead
    .find()
    .populate('contacts')
    .populate({
      path: 'tweets',
      match: {
        created_at: {
          // Set the limit of recent tweets to two weeks ago.
          $gte: new Date(new Date().getTime() - (14 * 24 * 3600 * 1000)),
        },
      },
    })
    .populate({
      path: 'google_news',
      match: {
        published_at: {
          // Set the limit of recent news to two weeks ago.
          $gte: new Date(new Date().getTime() - (14 * 24 * 3600 * 1000)),
        },
      },
    })
    .exec((err, leads) => {
      if (err) {
        return cb(err)
      }

      return cb(null, leads)
    })
}

const getLeads = (req, res, next) => {
  _getLeads((err, leads) => {
    if (err) {
      return next(err)
    }

    return res.status(200).json(leads)
  })
}

/**
 * [addContacts description]
 * @param {[type]}   lead     [description]
 * @param {[type]}   contacts [description]
 * @param {Function} cb       [description]
 */
const addContacts = (lead, contacts, cb) => {
  const contactDocuments = []
  contacts.forEach((contact) => {
    if (contact._id) {
      return
    }

    const existing = lead.contacts.find(_contact => (
      _contact.name === contact.name
    ))

    if (existing) {
      return
    }

    contactDocuments.push(new Contact({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      notes: contact.notes,
      lead: lead._id,
    }))
  })

  if (contactDocuments.length === 0) {
    return cb(null, [])
  }

  Contact.insertMany(contactDocuments, (err, contactsAdded) => { // eslint-disable-line no-shadow
    if (err) {
      return cb(err, [])
    }

    // Save new contacts to leads.
    lead.contacts.push(...contactsAdded)

    lead.save()

    return cb(null, contactsAdded)
  })
}

/**
 * [updateContacts description]
 * @param  {[type]}   lead     [description]
 * @param  {[type]}   contacts [description]
 * @param  {Function} cb       [description]
 * @return {[type]}            [description]
 */
const updateContacts = (lead, contacts, cb) => {
  const tasks = []
  const contactIdList = []
  contacts.forEach((contact) => {
    if (!contact._id) {
      return
    }

    contactIdList.push(contact._id)

    tasks.push((asyncCallback) => {
      Contact.findOneAndUpdate(
        {
          _id: contact._id,
        },
        {
          name: contact.name,
          email: contact.email,
          password: contact.password,
          notes: contact.notes,
        },
        {
          new: true, // Return the modified document.
        },
        (err, updatedDoc) => {
          if (err) {
            return asyncCallback(err)
          }

          asyncCallback(null, updatedDoc)
        })
    })
  })

  const contactsToRemove = []
  lead.contacts.forEach((_contact) => {
    const contactId = String(_contact._id)
    if (contactIdList.indexOf(contactId) !== -1) {
      return
    }
    contactsToRemove.push(contactId)
  })

  Contact.remove({
    _id: {
      $in: contactsToRemove,
    },
  }, (err) => {
    if (err) {
      return cb(err, [])
    }

    parallel(tasks, (err, updatedDocs) => { // eslint-disable-line no-shadow
      if (err) {
        return cb(err, [])
      }

      addContacts(lead, contacts, (err, addedDocs) => { // eslint-disable-line no-shadow
        if (err) {
          return cb(err, [])
        }

        return cb(null, [...updatedDocs, ...addedDocs])
      })
    })
  })
}

const addLead = (payload, cb) => {
  const lead = new Lead({
    company: payload.company,
    twitter_screen_name: payload.twitter_screen_name,
  })

  lead.save((err) => {
    if (err) {
      return cb(err)
    }

    if (typeof payload.contacts === 'undefined') {
      return cb(null, lead)
    }

    addContacts(lead, payload.contacts, (err) => { // eslint-disable-line no-shadow
      if (err) {
        return cb(err)
      }

      lead.populate('contacts', (err) => { // eslint-disable-line no-shadow
        if (err) {
          return cb(err)
        }

        return cb(null, lead)
      })
    })
  })
}

const postLead = (req, res, next) => {
  req.assert('company', 'Company cannot be blank.').notEmpty()

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      // Return an array of validation error messages.
      const message = result.useFirstErrorOnly().array().map(error => error.msg)
      return res.status(400).json({ message })
    }

    Lead
      .find({ company: req.body.company })
      .populate('contacts')
      .exec((err, existingLeads) => {
        if (err) {
          return next(err)
        }

        if (existingLeads.length > 0) {
          return res.status(400).json({ message: 'The company already exists.' })
        }

        addLead({
          company: req.body.company,
          twitter_screen_name: req.body.twitter_screen_name,
          contacts: req.body.contacts,
        }, (err, lead) => { // eslint-disable-line no-shadow
          if (err) {
            return next(err)
          }

          return res.status(200).json(lead)
        })
      })
  })
}

/**
 * Import leads from Google Sheets.
 */
const postLeadBulk = (req, res, next) => {
  req.assert('leads', 'Leads cannot be blank.').notEmpty()

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      // Return an array of validation error messages.
      const message = result.useFirstErrorOnly().array().map(error => error.msg)
      return res.status(400).json({ message })
    }

    const tasks = []
    req.body.leads.forEach((payload) => {
      tasks.push((cb) => {
        Lead.findOne({ company: payload[0] }, (err, existingLead) => {
          if (err) {
            return cb(err)
          }

          const contacts = [{
            name: payload[1],
            email: payload[2],
            phone: payload[3],
            notes: payload[4],
          }]

          if (existingLead) {
            existingLead.populate('contacts', (err) => { // eslint-disable-line no-shadow
              if (err) {
                return cb(err)
              }

              addContacts(existingLead, contacts, (err) => { // eslint-disable-line no-shadow
                if (err) {
                  return cb(err)
                }

                cb(null, existingLead)
              })
            })
          } else {
            addLead({
              company: payload[0],
              contacts,
            }, (err, lead) => { // eslint-disable-line no-shadow
              if (err) {
                return cb(err)
              }
              cb(null, lead)
            })
          }
        })
      })
    })

    series(tasks, (err) => {
      if (err) {
        return next(err)
      }

      _getLeads((err, leads) => { // eslint-disable-line no-shadow
        if (err) {
          return next(err)
        }

        return res.status(200).json(leads)
      })
    })
  })
}

const getLead = (req, res, next) => {
  Lead
    .findById(req.params.id)
    .populate('contacts')
    .exec((err, lead) => {
      if (err) {
        return next(err)
      }

      if (!lead) {
        return res.status(400).end()
      }

      return res.status(200).json(lead)
    })
}

const populateLead = (lead, cb) => {
  lead
    .populate('contacts')
    .populate({
      path: 'tweets',
      match: {
        created_at: {
          // Set the limit of recent tweets to two weeks ago.
          $gte: new Date(new Date().getTime() - (14 * 24 * 3600 * 1000)),
        },
      },
    })
    .populate({
      path: 'google_news',
      match: {
        published_at: {
          // Set the limit of recent news to two weeks ago.
          $gte: new Date(new Date().getTime() - (14 * 24 * 3600 * 1000)),
        },
      },
    }, (err) => {
      if (err) {
        return cb(err)
      }
      cb(null, lead)
    })
}

/**
 * Update an existing lead.
 */
const putLead = (req, res, next) => {
  req.assert('company', 'Company cannot be blank.').notEmpty()

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      // Return an array of validation error messages.
      const message = result.useFirstErrorOnly().array().map(error => error.msg)
      return res.status(400).json({ message })
    }

    Lead
      .find({
        _id: {
          $ne: req.params.id,
        },
        company: req.body.company,
      })
      .exec((err, existingLeads) => {
        if (err) {
          return next(err)
        }

        if (existingLeads.length > 0) {
          return res.status(400).json({ message: 'The company already exists.' })
        }

        const query = { _id: req.params.id }
        const payload = {
          company: req.body.company,
          twitter_screen_name: req.body.twitter_screen_name,
        }
        const options = {
          new: true, // Return the modified document.
        }

        // eslint-disable-next-line no-shadow
        Lead.findOneAndUpdate(query, payload, options, (err, lead) => {
          if (err) {
            return next(err)
          }

          if (!lead) {
            return res.status(400).json({ message: 'The company does not exist.' })
          }

          lead.populate('contacts', (err) => { // eslint-disable-line no-shadow
            if (err) {
              return next(err)
            }

            updateContacts(lead, req.body.contacts, (err) => { // eslint-disable-line no-shadow
              if (err) {
                return next(err)
              }

              populateLead(lead, (err) => { // eslint-disable-line no-shadow
                if (err) {
                  return next(err)
                }
                res.status(200).json(lead)
              })
            })
          })
        })
      })
  })
}

const deleteLead = (req, res, next) => {
  Lead.findById(req.params.id, (err, lead) => {
    if (err) {
      return next(err)
    }

    if (lead) {
      lead.remove()
    }

    return res.status(200).end()
  })
}

export default {
  getLeads,
  postLead,
  postLeadBulk,
  getLead,
  putLead,
  deleteLead,
}
