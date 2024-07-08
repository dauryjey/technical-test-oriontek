import { useState } from "react"
import { useParams } from "react-router"
import { fetcher } from "../utils/fetcher"
import { useMutation, UseMutationResult } from "@tanstack/react-query"
import api from "../const/api"
import { Link } from "react-router-dom"

export const AddCustomer = () => {
  const { id } = useParams<{ id: string }>()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  const addCustomer: UseMutationResult<
    unknown,
    Error,
    { firstName: string; lastName: string },
    unknown
  > = useMutation({
    mutationFn: (data: { firstName: string; lastName: string }) => {
      return fetcher(api.customer.post, "POST", {
        firstName: data.firstName,
        lastName: data.lastName,
        companyId: id,
      })
    },
  })

  const handleFormSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    addCustomer.mutate({ firstName, lastName })
    setFirstName("")
    setLastName("")
  }
  return (
    <section className="flex flex-col gap-2">
      <Link to={`/company/${id}`} className="text-left mb-6">
        Back
      </Link>
      <h1>Add Customer</h1>
      <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
        <label>
          First Name:
          <input
            className="ml-2"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            className="ml-2"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add</button>
      </form>
      {addCustomer.isPending && <p>Loading...</p>}
      {addCustomer.isError && <p className="text-red-600">Error</p>}
      {addCustomer.isSuccess && (
        <p className="text-green-600">Customer added</p>
      )}
    </section>
  )
}
