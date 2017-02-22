import reduce from 'async/reduce'
import Lead from 'Server/models/Lead'

const getLeads = (req, res, next) => {
  Lead
    .find()
    .exec((err, sheets) => {
      if (err) {
        return next(err)
      }

      return res.status(200).json(sheets)
    })
}

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

export default {
  getLeads,
  postLeadBulk,
}
