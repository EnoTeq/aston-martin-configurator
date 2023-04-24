
import type { ActionArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, isRouteErrorResponse, useActionData, useNavigation, useRouteError } from "@remix-run/react";
import { ArrowDownTrayIcon } from '@heroicons/react/20/solid'
import { classNames } from "~/utils";
import { getCarConfiguration, toCsv } from "~/scraper/scrape.server";
import ErrorBanner from "~/components/ErrorBanner";

const VALID_CODE_REGEX = /^\w{10,10}$/

export const meta: V2_MetaFunction = () => [{ title: "Aston Martin Congiguration Parser" }];

type ValidFormData = { code: string, csvData: string[][], model: string }
type FormData = { error: string | null, data: ValidFormData | null }

export async function action({ request }: ActionArgs) {
  const form = await request.formData();
  const code = form.get('code')
  if (typeof code !== "string")
    return json<FormData>({ error: "code is not a string", data: null }, { status: 400 })
  if (code.match(VALID_CODE_REGEX) == null)
    return json<FormData>({ error: "code must be 10 characters of letters and numbers", data: null }, { status: 400 })

  const {jsonResponse, model} = await getCarConfiguration(code)
  const csvData = toCsv(jsonResponse)
  // await sleep(3000)

  return json<FormData>({
    error: null,
    data: {
      code,
      csvData,
      model
    }
  })
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

  let plans: {grouping: string, code: string, name: string}[] = []
  if (actionData?.data) {
    const {csvData} = actionData.data
    const rows = csvData.slice(1)
    plans = rows.map(r => ({
      grouping: r[0],
      code: r[1],
      name: r[2]
    }))
    console.log(actionData?.data)
  }

  const navigation = useNavigation()
  console.log(navigation.state)
  const buttonDisabled = navigation.state === 'submitting' ? 'cursor-not-allowed bg-gray-400 hover:bg-gray-400' : ''


  return (
    <>
      {actionData?.error && <ErrorBanner title="Validation Error" messages={[actionData.error]}/>}

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

      {actionData?.data && <div className="mt-4 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-end">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Model: {actionData.data.model}</h1>
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
                  Code
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Grouping
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Name
                </th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan, planIdx) => (
                <tr key={plan.code}>
                  <td
                    className={classNames(
                      planIdx === 0 ? '' : 'border-t border-transparent',
                      'relative py-4 pl-4 pr-3 text-sm sm:pl-6'
                    )}
                  >
                    <div className="font-medium text-gray-900">
                      {plan.code}
                    </div>
                    <div className="mt-1 flex flex-col text-gray-500 sm:block lg:hidden">
                      <span>
                        {plan.grouping}
                      </span>
                    </div>
                    {planIdx !== 0 ? <div className="absolute -top-px left-6 right-0 h-px bg-gray-200" /> : null}
                  </td>
                  <td
                    className={classNames(
                      planIdx === 0 ? '' : 'border-t border-gray-200',
                      'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                    )}
                  >
                    {plan.grouping}
                  </td>
                  <td
                    className={classNames(
                      planIdx === 0 ? '' : 'border-t border-gray-200',
                      'px-3 py-3.5 text-sm text-gray-500'
                    )}
                  >
                    {plan.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>}
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <ErrorBanner title="Validation Error" messages={[error.error?.message || '']}/>
    )
  }
  console.log((error as Error).message)

  return (
    <ErrorBanner title="Unknown Error" messages={[(error as Error).message]}/>
  );
}
