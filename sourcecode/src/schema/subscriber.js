exports.schSubscriberReq = {
    type: "object",
    required: ["supplierId", "endpoint"],
    properties: {
      supplierId: { "type": "string", isNotEmpty: true },
      endpoint: { "type": "string" }
    }
  }