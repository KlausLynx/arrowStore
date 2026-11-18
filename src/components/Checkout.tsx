import { useState } from "react";
import type { FormEvent } from "react";

type FormValues = { name: string; email: string; phone: string; address: string };
type Errors = Partial<FormValues>;

const fields = [
  { name: "name", label: "Full name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone (e.g. 08012345678)", type: "tel" },
  { name: "address", label: "Delivery address", type: "text" },
] as const;

function validate(v: FormValues): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Enter your full name.";
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = "Enter a valid email, like ada@example.com.";
  if (!/^(\+234|0)\d{10}$/.test(v.phone.replace(/\s/g, "")))
    e.phone = "Enter a valid Nigerian phone number, like 08012345678.";
  if (v.address.trim().length < 5) e.address = "Enter your delivery address.";
  return e;
}

export default function Checkout({ onSuccess }: { onSuccess: () => void }) {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length === 0) onSuccess();
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <h2 className="mb-3 text-lg font-bold">Checkout</h2>

      {fields.map((f) => (
        <div key={f.name} className="mb-3">
          <label htmlFor={f.name} className="mb-1 block text-sm font-medium">
            {f.label}
          </label>
          <input
            id={f.name}
            type={f.type}
            value={values[f.name]}
            onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
            aria-invalid={errors[f.name] ? true : undefined}
            aria-describedby={errors[f.name] ? `${f.name}-error` : undefined}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 focus:border-indigo-500"
          />
          {errors[f.name] && (
            <p id={`${f.name}-error`} className="mt-1 text-sm text-red-600">
              {errors[f.name]}
            </p>
          )}
        </div>
      ))}

      <button
        type="submit"
        className="w-full rounded-xl bg-indigo-600 px-4 py-2.5 font-semibold text-white hover:bg-indigo-700"
      >
        Place order
      </button>
    </form>
  );
}