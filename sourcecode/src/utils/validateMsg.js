const Ajv = require('ajv')
const ajv = new Ajv({
  allErrors: true
}).addKeyword('isNotEmpty', {
  type: 'string',
  validate: function (condition, data) {
    // console.log('condition: ', condition)
    if (condition) {
      if (typeof data === 'object') {
        // console.log('xasdfasdfasdf', data)
        return data.length > 0
      }
      return typeof data === 'string' && data.trim() !== ''

      // return ( typeof data === 'string' && data.trim() !== '' )&& ( typeof data === 'array' && )
    } else {
      return true
    }
  }

})

/**
 * @param {*} data data for validate
 * @param {*} schema schema for validate
 * @param {*} appLog appLog for print log
 */
exports.validateMsg = (data, schema, appLog) => {
  let resultValidate = false
  let resultObj = {
    isValid: false,
    parm: ''
  }
  try {
    let parmError = ''
    let validate = ajv.compile(schema)
    resultValidate = validate(data)
    
    if (!resultValidate) {
      appLog.debug(`VALIDATE ${schema.name || ''} FAIL.`)
      let missingParam = []
      let oneOfParm = []
      let invalidParm = []
      for (const error of validate.errors) {
        if (error.keyword === 'required') {
          let val = error.params.missingProperty.replace(/^\./, '')
          
          if(error.dataPath){
            let path = error.dataPath
            val = path + '.' + val
          }
          if(missingParam.length != 0){
            val = ' ' + val
          }
          missingParam.push(val)
        } else if (error.keyword === 'oneOf') {
          let val = error.dataPath.replace(/^\./, '')
          if(oneOfParm.length != 0){
            val = ' ' + val
          }
          oneOfParm.push(val)
        } else {
          let val = error.dataPath.replace(/^\./, '')
          if(invalidParm.length != 0){
            val = ' ' + val
          }
          invalidParm.push(val)
        }
        let path = error.dataPath ? (' ' + error.dataPath + ' ') : ' '
        let err = `${schema.name || ''}${path}${error.message}`
        appLog.debug(err)
      }
      if (missingParam.length > 0) {
        parmError = 'missing=' + missingParam
      } else if(invalidParm.length > 0){
        parmError = 'invalid=' + invalidParm
      } else {
        parmError = 'invalid=' + oneOfParm
      }
    } else {
      appLog.debug(`VALIDATE ${schema.name || ''} SUCCESS.`)
    }
    resultObj.parm = parmError
    resultObj.isValid = resultValidate
    return resultObj
  } catch (e) {
    appLog.debug(e)
    resultObj.isValid = false
    resultObj.parm = (e.error)
    return resultObj
  }
}
