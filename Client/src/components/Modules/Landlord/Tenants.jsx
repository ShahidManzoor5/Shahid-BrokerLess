import React from "react";
import { Loading } from "../../Index";
import { BookUser, School } from "lucide-react";
import { useRecoilStateLoadable } from "recoil";
import { getAllTenants } from "../../../store/UserAtom";
import ContentError from "../ContentError";

function Tenants() {
  const [tenants] = useRecoilStateLoadable(getAllTenants());

  if (tenants.state === "loading") {
    return <Loading />;
  }

  if (tenants.state === "hasError") {
    return (
      <ContentError
        heading={"Error"}
        message={"An error occurred while fetching tenants"}
      />
    );
  }

  if (tenants.state === "hasValue") {
    if (tenants.contents.length === 0) {
      return (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-4xl font-bold text-black">No Tenant Found</h1>
        </div>
      );
    }

    return (
      <div className="w-full p-2">
        <div className="flex my-2 p-4 rounded-md ring-1 ring-violet-100">
          <BookUser className="w-6 h-6 inline-block" />
          <h1 className="font-bold text-black ml-2">Tenants</h1>
        </div>
        <div className="flex flex-col gap-2 w-full h-screen p-4 overflow-y-scroll">
          {tenants.contents.map((tenant, index) => (
            <TenantCard key={index} tenant={tenant} />
          ))}
        </div>
      </div>
    );
  }

  return null;
}

export default Tenants;

export function TenantCard({ tenant }) {
  console.log(tenant);
  return (
    <main className="flex h-20 flex-row justify-between items-center ring-1 ring-violet-200 bg-white p-4 rounded-lg shadow-lg">
      <div>
        <h1 className="text-l font-bold text-black">{tenant.tenant?.name}</h1>
        <p className="text-sm text-gray-400">{tenant.tenant?.email}</p>
        <p className="text-sm text-gray-400">{tenant.tenant?.phone}</p>
      </div>
      <div className="flex w-1/2 justify-evenly items-center">
        <div>
          <School size={30} color="green" className="inline-block" />
          <span className="text-md text-green-800 font-bold pl-3">
            {tenant?.name}
          </span>
        </div>
      </div>
      <div className="flex">
        <p>That Days left</p>
        <p>
          {(new Date(tenant.Agreement[0]?.endDate) -
            new Date(tenant.Agreement[0]?.startDate)) /
            (1000 * 60 * 60 * 24)}
        </p>
      </div>
    </main>
  );
}
