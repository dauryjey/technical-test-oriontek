import { useNavigate, useParams } from "react-router"
import { fetcher } from "../utils/fetcher"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Company } from "../types/api"
import api from "../const/api"
import { Link } from "react-router-dom"

export const CompanyDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const company = useQuery<Company>({
    queryKey: ["company", id],
    queryFn: () => fetcher(`${api.company.get}${id}`, "GET"),
  })

  const deleteCustomer = useMutation({
    mutationFn: (id: string) =>
      fetcher(`${api.customer.delete}${id}`, "DELETE"),
    onSettled: () => company.refetch(),
  })

  const handleDelete = (id: string) => {
    deleteCustomer.mutate(id)
  }

  return (
    <>
      {company.isLoading && <p>Loading...</p>}
      {company.isError && <p className="text-red-600">Error</p>}
      {company.isSuccess && (
        <section className="flex flex-col gap-2">
										<Link to={"/"} className="text-left mb-6">Back</Link>
          <h1>Company: {company.data.name}</h1>
          <h2>Customers:</h2>
          <ul>
            {company.data.Customers.map((customer) => (
              <article
                className="flex justify-between items-center gap-4 bg-gray-300 px-4 py-2 rounded-xl mt-2"
                key={customer.id}
              >
                <li key={customer.id}>
                  <p className="font-semibold">
                    Name: {customer.firstName} {customer.lastName}
                  </p>
                </li>
                <div>
                  <button
                    className="mr-2"
                    onClick={() => navigate(`/company/${id}/customer/${customer.id}`)}
                  >
                    Addresses
                  </button>
                  <button onClick={() => handleDelete(customer.id)}>
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </ul>
          <button onClick={() => navigate(`/company/${id}/customer/add`)}>
            Add customer
          </button>
        </section>
      )}
    </>
  )
}
