export type Company = {
  id: string
  name: string
  Customers: Customer[]
}

export type Address = {
  id: string
  street: string
  city: string
  state: string
  zip: string
  customerId: string
}

export type Customer = {
  id: string
  firstName: string
  lastName: string
  Addresses: Address[]
  companyId: string
}
