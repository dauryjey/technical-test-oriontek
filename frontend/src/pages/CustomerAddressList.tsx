import { useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router"
import { Address, Customer } from "../types/api"
import { fetcher } from "../utils/fetcher"
import api from "../const/api"
import { Link } from "react-router-dom"

export const CustomerAdressList = () => {
  const { id, customerId } = useParams()
		const navigate = useNavigate()

  const customer = useQuery<Customer>({
    queryKey: ["customer", customerId],
    queryFn: () => fetcher(`${api.customer.getById}${customerId}`, "GET"),
  })

  const deleteCompany = useMutation({
    mutationFn: (id: string) => fetcher(`${api.address.delete}${id}`, "DELETE"),
    onSettled: () => customer.refetch(),
  })

  const handleAdressDelete = (id: string) => {
    deleteCompany.mutate(id)
  }

  return (
    <>
      {customer.isLoading && <p>Loading...</p>}
      {customer.isError && <p>Error</p>}
      {customer.isSuccess && (
        <section>
          <Link to={"/"} className="text-left mb-6">
            Back
          </Link>
          <h1>
            Customer: {customer.data.firstName} {customer.data.lastName}
          </h1>
          <h2>Addresses:</h2>
          <ul>
            {customer.data.Addresses.map((address: Address) => (
              <article
                className="flex justify-between items-center gap-4 bg-gray-300 px-4 py-2 rounded-xl mt-2"
                key={address.id}
              >
                <li key={address.id}>
                  <p className="font-semibold">
                    {address.street}, {address.city}, {address.zip}
                  </p>
                </li>
                <button onClick={() => handleAdressDelete(address.id)}>
                  Delete
                </button>
              </article>
            ))}
            {customer.data.Addresses.length === 0 && <p>No addresses</p>}
          </ul>
          <button className="mt-2" onClick={() => navigate(`/company/${id}/customer/${customerId}/address/add`)}>Add Address</button>
        </section>
      )}
    </>
  )
}
