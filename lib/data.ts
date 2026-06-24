export const ADDR: Record<string, string> = {
  "0x742d35Cc6634C0532925a3b8D4C9":"Port of LA Authority",
  "0x1a2B3c4D5e6F7a8B9c0D1e2F3a4B":"Hapag-Lloyd Carrier",
  "0x9f8E7d6C5b4A3f2E1d0C9b8A7f6E":"Maersk Line LLC",
  "0x3c4D5e6F7a8B9c0D1e2F3a4B5c6D":"Pacific Dray Inc.",
  "0xA1b2C3d4E5f6A1b2C3d4E5f6A1b2C":"COSCO Shipping",
  "0xF9e8D7c6B5a4F9e8D7c6B5a4F9e8D":"Long Beach Terminal",
  "0x7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D":"Swift Cargo LLC",
  "0x2E3F4A5B6C7D8E9F0A1B2C3D4E5F6A":"Port of NY/NJ Auth",
  "0xD1E2F3A4B5C6D7E8F9A0B1C2D3E4F5":"Evergreen Marine",
  "0x6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0":"Yang Ming Transport",
};

export function shortAddr(addr: string) {
  return addr.slice(0, 8) + "..." + addr.slice(-4);
}

export function shortHash(hash: string) {
  return hash.slice(0, 12) + "..." + hash.slice(-6);
}

export function addrLabel(addr: string) {
  return ADDR[addr] ?? shortAddr(addr);
}

const METHODS = ["BookLoad","AssignCarrier","ConfirmPickup","ConfirmDelivery","ReleasePayment","UpdateBOL","LockRate","RaiseDispute","UpdateStatus","CloseLoad"];
const METHOD_COLORS: Record<string, string> = {
  BookLoad: "#3b82f6",
  AssignCarrier: "#8b5cf6",
  ConfirmPickup: "#f59e0b",
  ConfirmDelivery: "#22c55e",
  ReleasePayment: "#10b981",
  UpdateBOL: "#06b6d4",
  LockRate: "#f97316",
  RaiseDispute: "#ef4444",
  UpdateStatus: "#64748b",
  CloseLoad: "#6366f1",
};
export { METHOD_COLORS };

const ADDRS = Object.keys(ADDR);
function pick<T>(arr: T[]) { return arr[Math.floor(arr.length * 0.3)]; }

export type Block = {
  number: number;
  timestamp: string;
  age: string;
  validator: string;
  loadCount: number;
  gasUsed: string;
  gasPercent: number;
  reward: string;
  burntFees: string;
};

export type Transaction = {
  hash: string;
  method: string;
  block: number;
  age: string;
  from: string;
  to: string;
  value: string;
  fee: string;
  status: "success" | "failed";
};

export type Contract = {
  rank: number;
  name: string;
  address: string;
  balance: string;
  txns: string;
  compiler: string;
  verifiedDate: string;
  audited: boolean;
  category: string;
};

const CONTRACT_NAMES = [
  { name: "BOL Registry v2", category: "Document" },
  { name: "Payment Escrow", category: "Finance" },
  { name: "Rate Lock Contract", category: "Pricing" },
  { name: "Demurrage Tracker", category: "Compliance" },
  { name: "Carrier Reputation", category: "Identity" },
  { name: "Load Dispatch", category: "Operations" },
  { name: "Port Gate Pass", category: "Access" },
  { name: "Chassis Pool", category: "Equipment" },
  { name: "Dispute Resolution", category: "Legal" },
  { name: "Multi-Port Router", category: "Routing" },
  { name: "FSC Calculator", category: "Pricing" },
  { name: "Accessorial Vault", category: "Finance" },
  { name: "Per Diem Monitor", category: "Compliance" },
  { name: "POD Verifier", category: "Document" },
  { name: "Carrier KYC", category: "Identity" },
  { name: "Lane Intelligence", category: "Analytics" },
  { name: "Appointment Scheduler", category: "Operations" },
  { name: "Customs Bridge", category: "Compliance" },
  { name: "Insurance Oracle", category: "Finance" },
  { name: "Terminal API Adapter", category: "Integration" },
];

export const BLOCKS: Block[] = Array.from({ length: 50 }, (_, i) => {
  const num = 4183920 - i;
  const loads = 12 + ((i * 7 + 3) % 88);
  const gp = 18 + ((i * 13) % 42);
  const gl = 30;
  const pct = Math.round((gp / gl) * 100);
  const mins = i === 0 ? "2 secs" : i === 1 ? "14 secs" : i < 5 ? `${i * 12} secs` : i < 20 ? `${Math.floor(i * 0.5)} mins` : `${i} mins`;
  return {
    number: num,
    timestamp: `2026-06-24 ${String(1 + Math.floor(i / 4)).padStart(2,"0")}:${String((i * 13) % 60).padStart(2,"0")} UTC`,
    age: mins + " ago",
    validator: ADDRS[i % ADDRS.length],
    loadCount: loads,
    gasUsed: `${gp}.${(i * 3) % 9}M / ${gl}M`,
    gasPercent: pct,
    reward: `${(0.018 + (i % 7) * 0.004).toFixed(3)} DRAY`,
    burntFees: `${(0.003 + (i % 5) * 0.001).toFixed(4)} DRAY`,
  };
});

export const TRANSACTIONS: Transaction[] = Array.from({ length: 100 }, (_, i) => {
  const method = METHODS[i % METHODS.length];
  const secs = i < 3 ? `${i * 4 + 3} secs` : i < 10 ? `${i * 8} secs` : i < 30 ? `${Math.floor(i * 0.6)} mins` : `${i} mins`;
  const val = (180 + (i * 173) % 4200).toFixed(2);
  const fee = (0.18 + (i % 9) * 0.07).toFixed(2);
  return {
    hash: `0x${[...Array(64)].map((_, j) => "0123456789abcdef"[(i * 7 + j * 13) % 16]).join("")}`,
    method,
    block: 4183920 - Math.floor(i / 3),
    age: secs + " ago",
    from: ADDRS[i % ADDRS.length],
    to: ADDRS[(i + 3) % ADDRS.length],
    value: `$${val}`,
    fee: `$${fee}`,
    status: i % 17 === 0 ? "failed" : "success",
  };
});

export const CONTRACTS: Contract[] = CONTRACT_NAMES.map((c, i) => ({
  rank: i + 1,
  name: c.name,
  address: ADDRS[i % ADDRS.length],
  balance: `${(1200 + (i * 3847) % 98000).toLocaleString()} DRAY`,
  txns: `${(800 + (i * 1234) % 85000).toLocaleString()}`,
  compiler: `Solidity 0.8.${20 + (i % 6)}`,
  verifiedDate: `2025-${String(1 + (i % 12)).padStart(2,"0")}-${String(1 + (i % 28)).padStart(2,"0")}`,
  audited: i % 3 !== 2,
  category: c.category,
}));
