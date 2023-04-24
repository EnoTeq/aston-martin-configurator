
import type { ActionArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, isRouteErrorResponse, useActionData, useNavigation, useRouteError } from "@remix-run/react";
import { ArrowDownTrayIcon } from '@heroicons/react/20/solid'
import { classNames } from "~/utils";
import { sleep } from "~/utils.server";
import { getCarConfiguration } from "~/scraper/scrape.server";

const VALID_CODE_REGEX = /^\w{10,10}$/

export const meta: V2_MetaFunction = () => [{ title: "Aston Martin Congiguration Parser" }];

export async function action({ request }: ActionArgs) {
  const form = await request.formData();
  const code = form.get('code')
  if (typeof code !== "string")
    return json({ error: "code is not a string" }, { status: 400 })
  if (code.match(VALID_CODE_REGEX) == null)
    return json({ error: "code must be 10 characters" }, { status: 400 })

  const res = await getCarConfiguration(code)
  // await sleep(3000)

  return json({error: null, res})
  // const project = await createProject(body);
  // return redirect(`/projects/${project.id}`);
}


export default function Index() {
  const actionData = useActionData<typeof action>();
  if (actionData?.error) {
    console.log("error occurred")
    console.log(actionData)
  } else {
    console.log(actionData)
  }

  const navigation = useNavigation()
  console.log(navigation.state)
  const buttonDisabled = navigation.state === 'submitting' ? 'cursor-not-allowed bg-gray-400 hover:bg-gray-400' : ''
  const plans = [
    {
      id: 1,
      name: 'Hobby',
      memory: '4 GB RAM',
      cpu: '4 CPUs',
      storage: '128 GB SSD disk',
      price: '$40',
      isCurrent: false,
    },
    {
      id: 2,
      name: 'Startup',
      memory: '8 GB RAM',
      cpu: '6 CPUs',
      storage: '256 GB SSD disk',
      price: '$80',
      isCurrent: true,
    },
    {
      id: 2,
      name: 'Startup',
      memory: '8 GB RAM',
      cpu: '6 CPUs',
      storage: '256 GB SSD disk',
      price: '$80',
      isCurrent: true,
    },
    {
      id: 2,
      name: 'Startup',
      memory: '8 GB RAM',
      cpu: '6 CPUs',
      storage: '256 GB SSD disk',
      price: '$80',
      isCurrent: true,
    },
    {
      id: 2,
      name: 'Startup',
      memory: '8 GB RAM',
      cpu: '6 CPUs',
      storage: '256 GB SSD disk',
      price: '$80',
      isCurrent: true,
    },
    {
      id: 2,
      name: 'Startup',
      memory: '8 GB RAM',
      cpu: '6 CPUs',
      storage: '256 GB SSD disk',
      price: '$80',
      isCurrent: true,
    },
    {
      id: 2,
      name: 'Startup',
      memory: '8 GB RAM',
      cpu: '6 CPUs',
      storage: '256 GB SSD disk',
      price: '$80',
      isCurrent: true,
    },
    // More plans...
  ]


  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-start sm:justify-center">
      <div className="relative sm:pb-16">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative px-4 pb-8 pt-16 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-20">
            <h1 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-4xl">
              <span className="block capitalize text-yellow-500">
                Aston Martin Congiguration Parser
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-center text-xl sm:max-w-3xl">
              A utility tool to extract <Link className="text-yellow-500 hover:text-yellow-600" to="https://my.astnmrt.in/CFKOLIWSNF">Aston Martin configurator</Link> data in a structured comma-separated format given a Code.
            </p>

            <Form method="POST" className="flex flex-col items-center">
              <div className="flex flex-col justify-center sm:col-span-4 mt-4 w-70">
                <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">
                  Enter Configurator Code
                </label>
                <div className="mt-1">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-yellow-600 max-w-xs w-full sm:w-56">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">my.astnmrt.in/</span>
                    <input
                      maxLength={10}
                      minLength={10}
                      type="text"
                      name="code"
                      id="code"
                      autoComplete="code"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="CFKOLIWSNF"
                    />
                  </div>
                </div>
              </div>


              <div className="mx-auto mt-5 max-w-sm sm:flex sm:max-w-none justify-center">
                <div className="space-y-4 mx-auto">
                  <button
                    type="submit"
                    className={"flex items-center justify-center rounded-md bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600 " + buttonDisabled}
                    disabled={navigation.state === 'submitting'}
                  >
                    {navigation.state === 'submitting' ? "Generating CSV" : "Extract Data"}
                  </button>
                </div>
              </div>
            </Form>

            <div className="mt-4 px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-end">
                <div className="sm:flex-auto">
                  <h1 className="text-base font-semibold leading-6 text-gray-900">Model: AM608</h1>
                  {/* <p className="mt-2 text-sm text-gray-700">
                    Your team is on the <strong className="font-semibold text-gray-900">Startup</strong> plan. The next payment
                    of $80 will be due on August 4, 2022.
                  </p> */}
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                  <button
                    type="button"
                    className="inline-flex items-center gap-x-1.5 rounded-md bg-yellow-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <ArrowDownTrayIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                    Download as CSV
                  </button>
                </div>
              </div>
              <div className="-mx-4 mt-2 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Plan
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                      >
                        Memory
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                      >
                        CPU
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                      >
                        Storage
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Price
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Select</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {plans.map((plan, planIdx) => (
                      <tr key={plan.id}>
                        <td
                          className={classNames(
                            planIdx === 0 ? '' : 'border-t border-transparent',
                            'relative py-4 pl-4 pr-3 text-sm sm:pl-6'
                          )}
                        >
                          <div className="font-medium text-gray-900">
                            {plan.name}
                            {plan.isCurrent ? <span className="ml-1 text-indigo-600">(Current Plan)</span> : null}
                          </div>
                          <div className="mt-1 flex flex-col text-gray-500 sm:block lg:hidden">
                            <span>
                              {plan.memory} / {plan.cpu}
                            </span>
                            <span className="hidden sm:inline">·</span>
                            <span>{plan.storage}</span>
                          </div>
                          {planIdx !== 0 ? <div className="absolute -top-px left-6 right-0 h-px bg-gray-200" /> : null}
                        </td>
                        <td
                          className={classNames(
                            planIdx === 0 ? '' : 'border-t border-gray-200',
                            'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                          )}
                        >
                          {plan.memory}
                        </td>
                        <td
                          className={classNames(
                            planIdx === 0 ? '' : 'border-t border-gray-200',
                            'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                          )}
                        >
                          {plan.cpu}
                        </td>
                        <td
                          className={classNames(
                            planIdx === 0 ? '' : 'border-t border-gray-200',
                            'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                          )}
                        >
                          {plan.storage}
                        </td>
                        <td
                          className={classNames(
                            planIdx === 0 ? '' : 'border-t border-gray-200',
                            'px-3 py-3.5 text-sm text-gray-500'
                          )}
                        >
                          <div className="sm:hidden">{plan.price}/mo</div>
                          <div className="hidden sm:block">{plan.price}/month</div>
                        </td>
                        <td
                          className={classNames(
                            planIdx === 0 ? '' : 'border-t border-transparent',
                            'relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'
                          )}
                        >
                          <button
                            type="button"
                            className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                            disabled={plan.isCurrent}
                          >
                            Select<span className="sr-only">, {plan.name}</span>
                          </button>
                          {planIdx !== 0 ? <div className="absolute -top-px left-0 right-6 h-px bg-gray-200" /> : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export function ErrorBoundary() {
  const error = useRouteError()

  console.log(error)

  return (
    <div className="error-container">
      Something unexpected went wrong. Sorry about that.
    </div>
  );
}
