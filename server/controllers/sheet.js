import Sheet from 'Server/models/Sheet'

/**
 * [_getSheets description]
 * @param  {Function} cb [description]
 * @return {[type]}      [description]
 */
export const _getSheets = (cb) => {
  Sheet
    .find()
    .exec((err, sheets) => {
      if (err) {
        return cb(err)
      }

      return cb(null, sheets)
    })
}

/**
 * [getSheets description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
const getSheets = (req, res, next) => {
  _getSheets((err, sheets) => {
    if (err) {
      return next(err)
    }

    return res.status(200).json(sheets)
  })
}

/**
 * [postSheet description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
const postSheet = (req, res, next) => {
  req.assert('title', 'Title cannot be blank.').notEmpty()
  req.assert('spreadsheetId', 'Spreadsheet ID cannot be blank.').notEmpty()
  req.assert('sheetName', 'Sheet name cannot be blank.').notEmpty()

  req.getValidationResult().then((result) => { // eslint-disable-line consistent-return
    if (!result.isEmpty()) {
      // Return an array of validation error messages.
      const message = result.useFirstErrorOnly().array().map(error => error.msg)
      return res.status(400).json({ message })
    }

    const sheet = new Sheet({
      title: req.body.title,
      spreadsheetId: req.body.spreadsheetId,
      sheetName: req.body.sheetName,
    })

    sheet.save((err) => {
      if (err) {
        return next(err)
      }

      return res.status(200).json(sheet)
    })
  })
}

/**
 * [getSheet description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
const getSheet = (req, res, next) => {
  Sheet.findById(req.params.id, (err, sheet) => {
    if (err) {
      return next(err)
    }

    if (!sheet) {
      return res.status(400).end()
    }

    return res.status(200).json(sheet)
  })
}

/**
 * [putSheet description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
const putSheet = (req, res, next) => {
  req.assert('title', 'Title cannot be blank.').notEmpty()
  req.assert('spreadsheetId', 'Spreadsheet ID cannot be blank.').notEmpty()
  req.assert('sheetName', 'Sheet name cannot be blank.').notEmpty()

  req.getValidationResult().then((result) => { // eslint-disable-line consistent-return
    if (!result.isEmpty()) {
      // Return an array of validation error messages.
      const message = result.useFirstErrorOnly().array().map(error => error.msg)
      return res.status(400).json({ message })
    }

    const query = { _id: req.params.id }
    const payload = {
      title: req.body.title,
      spreadsheetId: req.body.spreadsheetId,
      sheetName: req.body.sheetName,
    }
    const options = {
      new: true, // Return the modified document.
    }

    Sheet.findOneAndUpdate(query, payload, options, (err, sheet) => {
      if (err) {
        return next(err)
      }

      return res.status(200).json(sheet)
    })
  })
}

/**
 * [deleteSheet description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
const deleteSheet = (req, res, next) => {
  Sheet.remove({ _id: req.params.id }, (err) => {
    if (err) {
      return next(err)
    }

    return res.status(200).end()
  })
}

export default {
  getSheets,
  postSheet,
  getSheet,
  putSheet,
  deleteSheet,
}
