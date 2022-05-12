const PayOnline = function (pay) {
  this.ipAddr = pay.ipAddr;
  this.orderType = pay.orderType;
  this.amount = pay.amount;
  this.bankCode = pay.bankCode;
  this.language = pay.language;
};

PayOnline.create_payment_url = (newPay, result) => {
  const config = require("config");
  const moment = require("moment");

  var tmnCode = config.get("vnp_TmnCode");
  var secretKey = config.get("vnp_HashSecret");
  var vnpUrl = config.get("vnp_Url");
  var returnUrl = config.get("vnp_ReturnUrl");

  var createDate = moment().format("YYYYMMDDHHmmss");
  var orderId = moment().format("HHmmss");
  var amount = newPay.amount;
  var bankCode = newPay.bankCode;

  var orderInfo = `Thanh toán hóa đơn ${bankCode} - ${moment().format("DD/MM/YYYY")}`;
  var orderType = newPay.orderType;
  var locale = newPay.language;
  if (locale === null || locale === "") {
    locale = "vn";
  }
  var currCode = "VND";
  var vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  // vnp_Params['vnp_Merchant'] = ''
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = orderInfo;
  vnp_Params["vnp_OrderType"] = orderType;
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = newPay.ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);

  var querystring = require("qs");
  var signData = querystring.stringify(vnp_Params, {encode: false});
  var crypto = require("crypto");
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(new Buffer.from(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, {encode: false});

  result(null, vnpUrl);
};

PayOnline.vnpay_ipn = (vnp_Params, result) => {
  var secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);
  var config = require("config");
  var secretKey = config.get("vnp_HashSecret");
  var querystring = require("qs");
  var signData = querystring.stringify(vnp_Params, {encode: false});
  var crypto = require("crypto");
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(new Buffer.from(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    var orderId = vnp_Params["vnp_TxnRef"];
    var rspCode = vnp_Params["vnp_ResponseCode"];
    //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi

    result(null, {RspCode: "00", Message: "success"});
  } else {
    result(null, {RspCode: "97", Message: "Fail checksum"});
  }
};

const sortObject = (obj) => {
  var sorted = {};
  var str = [];
  var key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
};

module.exports = PayOnline;
