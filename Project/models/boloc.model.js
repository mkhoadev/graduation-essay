const mysql = require('./db')

const Filter = function (filter) {
  this.key = filter.key
}

Filter.sortBy = (key, result) => {
  mysql.query(
    `SELECT san_pham.*, khuyen_mai.gia_km, IF(khuyen_mai.gia_km >0, (san_pham.gia_ban_sp - (san_pham.gia_ban_sp * khuyen_mai.gia_km/100)), san_pham.gia_ban_sp) as gia_da_km FROM san_pham LEFT JOIN khuyen_mai ON san_pham.id_sp = khuyen_mai.id_sp ORDER BY gia_da_km ${key}`,
    (err, res) => {
      if (err) {
        console.log('ERROR: ', err)
        result(err, null)
        return
      }
      result(null, res)
    },
  )
}

Filter.sortBrand = (key, result) => {
  mysql.query(
    `SELECT san_pham.*, khuyen_mai.gia_km, IF(khuyen_mai.gia_km >0, (san_pham.gia_ban_sp - (san_pham.gia_ban_sp * khuyen_mai.gia_km/100)), san_pham.gia_ban_sp) as gia_da_km FROM san_pham LEFT JOIN khuyen_mai ON san_pham.id_sp = khuyen_mai.id_sp  WHERE id_th='${key}'`,
    (err, res) => {
      if (err) {
        console.log('ERROR: ', err)
        result(err, null)
        return
      }
      result(null, res)
    },
  )
}

Filter.sortSize = (key, result) => {
  mysql.query(
    `SELECT * FROM san_pham WHERE id_kt='${key}' ORDER BY SUBSTRING(id_sp,4)*1 ASC`,
    (err, res) => {
      if (err) {
        console.log('ERROR: ', err)
        result(err, null)
        return
      }
      result(null, res)
    },
  )
}

Filter.search = (key, result) => {
  mysql.query(
    `SELECT * FROM san_pham WHERE ten_sp LIKE '%${key}%' ORDER BY SUBSTRING(id_sp,4)*1 ASC LIMIT 5`,
    (err, res) => {
      if (err) {
        console.log('ERROR: ', err)
        result(err, null)
        return
      }
      result(null, res)
    },
  )
}

Filter.rangePrice = (data, result) => {
  mysql.query(
    `SELECT * from A WHERE gia_da_km >= ${data[0]} AND gia_da_km <=${data[1]}`,
    (err, res) => {
      if (err) {
        console.log('ERROR: ', err)
        result(err, null)
        return
      }
      result(null, res)
    },
  )
}

module.exports = Filter
