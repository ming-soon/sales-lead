import reduce from 'async/reduce'
import Lead from 'Server/models/Lead'

export const _getLeads = (cb) => {
  Lead
    .find()
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

const postLead = (req, res, next) => {
  req.assert('company', 'Company cannot be blank.').notEmpty()

  req.getValidationResult().then((result) => { // eslint-disable-line consistent-return
    if (!result.isEmpty()) {
      // Return an array of validation error messages.
      const message = result.useFirstErrorOnly().array().map(error => error.msg)
      return res.status(400).json({ message })
    }

    const lead = new Lead({
      company: req.body.company,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      notes: req.body.notes,
      twitter_screen_name: req.body.twitter_screen_name,
    })

    lead.save((err) => {
      if (err) {
        return next(err)
      }

      return res.status(200).json(lead)
    })
  })
}

/**
 * Import leads from Google Sheets.
 */
const postLeadBulk = (req, res, next) => {
  req.assert('leads', 'Leads cannot be blank.').notEmpty()

  req.getValidationResult().then((result) => { // eslint-disable-line consistent-return
    if (!result.isEmpty()) {
      // Return an array of validation error messages.
      const message = result.useFirstErrorOnly().array().map(error => error.msg)
      return res.status(400).json({ message })
    }

    reduce(req.body.leads, [], (memo, lead, cb) => {
      Lead.find({ company: lead[0] }, (err, existingLeads) => {
        if (err || existingLeads.length > 0) {
          return cb(null, memo)
        }

        memo.push(new Lead({
          company: lead[0],
          name: lead[1],
          email: lead[2],
          phone: lead[3],
          notes: lead[4],
        }))

        return cb(null, memo)
      })
    }, (err, leads) => {
      if (!leads.length) {
        res.status(200).json([])
      } else {
        Lead.insertMany(leads, (err, leadsAdded) => { // eslint-disable-line no-shadow
          if (err) {
            return next(err)
          }

          return res.status(200).json(leadsAdded)
        })
      }
    })
  })
}

const getLead = (req, res, next) => {
  Lead.findById(req.params.id, (err, lead) => {
    if (err) {
      return next(err)
    }

    if (!lead) {
      return res.status(400).end()
    }

    return res.status(200).json(lead)
  })
}

/**
 * Update an existing lead.
 */
const putLead = (req, res, next) => {
  req.assert('company', 'Company cannot be blank.').notEmpty()

  req.getValidationResult().then((result) => { // eslint-disable-line consistent-return
    if (!result.isEmpty()) {
      // Return an array of validation error messages.
      const message = result.useFirstErrorOnly().array().map(error => error.msg)
      return res.status(400).json({ message })
    }

    const query = { _id: req.params.id }
    const payload = {
      company: req.body.company,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      notes: req.body.notes,
      twitter_screen_name: req.body.twitter_screen_name,
    }
    const options = {
      new: true, // Return the modified document.
    }

    Lead.findOneAndUpdate(query, payload, options, (err, lead) => {
      if (err) {
        return next(err)
      }

      return res.status(200).json(lead)
    })
  })
}

const deleteLead = (req, res, next) => {
  Lead.remove({ _id: req.params.id }, (err) => {
    if (err) {
      return next(err)
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
