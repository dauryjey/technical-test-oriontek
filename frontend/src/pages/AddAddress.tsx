import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { fetcher } from "../utils/fetcher"
import api from "../const/api"

export const AddAddress = () => {
  const { customerId } = useParams()
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zip, setZip] = useState("")

  const addAddress: UseMutationResult = useMutation({
    mutationFn: (newAddress) => {
      return fetcher(api.address.post, "POST", newAddress)
    },
  })

  const handleFormSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    addAddress.mutate({ street, city, state, zip, customerId })
				setStreet("")
				setCity("")
				setState("")
				setZip("")
  }

  return (
    <section className="flex flex-col">
      <Link to={"/"} className="text-left mb-6">
        Back
      </Link>
      <h1 className="mb-4">Add address</h1>
      <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          name="street"
          value={street}
          required
          onChange={(e) => setStreet(e.target.value)}
        />
        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          value={city}
          required
          onChange={(e) => setCity(e.target.value)}
        />
        <label htmlFor="state">State</label>
        <input
          type="text"
          name="state"
          value={state}
          required
          onChange={(e) => setState(e.target.value)}
        />
        <label htmlFor="zip">Zip</label>
        <input
          type="text"
          name="zip"
          value={zip}
          required
          onChange={(e) => setZip(e.target.value)}
        />
        <button type="submit" disabled={addAddress.isPending}>
          Submit
        </button>
        {addAddress.isPending && <p>Loading...</p>}
        {addAddress.isError && <p className="text-red-600">Error</p>}
        {addAddress.isSuccess && (
          <p className="text-green-600">Address added</p>
        )}
      </form>
    </section>
  )
}
