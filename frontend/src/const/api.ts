export default {
  company: {
    get: "http://localhost:4000/api/company/",
    getById: "http://localhost:4000/api/company/",
    post: "http://localhost:4000/api/company/",
    delete: "http://localhost:4000/api/company/",
  },
  address: {
    post: "http://localhost:4000/api/address/",
    delete: "http://localhost:4000/api/address/",
  },
  customer: {
    getById: "http://localhost:4000/api/customer/",
    post: "http://localhost:4000/api/customer/",
    delete: "http://localhost:4000/api/customer/",
  },
}
