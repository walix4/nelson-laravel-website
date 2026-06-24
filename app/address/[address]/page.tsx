import { ADDR } from "@/lib/data";
import AddressContent from "@/components/AddressContent";

export function generateStaticParams() {
  return Object.keys(ADDR).map(addr => ({ address: addr }));
}

export default async function AddressPage({ params }: { params: Promise<{ address: string }> }) {
  const { address } = await params;
  return <AddressContent address={address} />;
}
