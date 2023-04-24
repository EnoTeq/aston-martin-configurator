import type { V2_MetaFunction } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";

export const meta: V2_MetaFunction = () => [{ title: "Aston Martin Congiguration Parser" }];

export default function Index() {
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-start sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative px-4 pb-8 pt-16 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-32">
            <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-4xl lg:text-4xl">
              <span className="block capitalize text-yellow-500 drop-shadow-md">
                Aston Martin Congiguration Parser
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-center text-xl sm:max-w-3xl">
              A utility tool to extract <Link className="text-yellow-500 hover:text-yellow-600" to="https://my.astnmrt.in/CFKOLIWSNF">Aston Martin configurator</Link> data in a structured comma-separated format given a Code.
            </p>

            <Form method="GET" className="flex flex-col items-center">
              <div className="flex flex-col justify-center sm:col-span-4 mt-4 w-70">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Enter Configurator Code
                </label>
                <div className="mt-1">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-yellow-600 max-w-xs w-64">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">https://my.astnmrt.in/</span>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
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
                    className="flex items-center justify-center rounded-md bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600"
                  >
                    Extract Data
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
}
