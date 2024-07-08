export type Company = {
		id: string
		name: string
}

export	type Address = {
		id: string
		street: string
		city: string
		state: string
		zip: string
		customerId: string
}

export	type Customer = {
		id: string
		firstName: string
		lastName: string
		companyId: string[]
}