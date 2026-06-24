import type { IconType } from "react-icons";
import {
  FaHouse,
  FaBuilding,
  FaCheck,
  FaShieldHalved,
  FaUserTie,
  FaHandshake,
  FaChartLine,
  FaPercent,
  FaMoneyBillTransfer,
  FaMoneyBillTrendUp,
  FaUsers,
  FaDollarSign,
  FaHeart,
  FaPiggyBank,
  FaFileContract,
  FaChartPie,
  FaLandmark,
  FaKey,
  FaArrowsSpin,
  FaHatCowboy,
  FaBriefcase,
  FaCartShopping,
  FaCar,
  FaHandHoldingDollar,
  FaArrowTrendUp,
} from "react-icons/fa6";

/** Icon name -> component map shared by the detailed loan renderer and admin editor. */
export const LOAN_ICONS: Record<string, IconType> = {
  FaHouse,
  FaBuilding,
  FaCheck,
  FaShieldHalved,
  FaUserTie,
  FaHandshake,
  FaChartLine,
  FaPercent,
  FaMoneyBillTransfer,
  FaMoneyBillTrendUp,
  FaUsers,
  FaDollarSign,
  FaHeart,
  FaPiggyBank,
  FaFileContract,
  FaChartPie,
  FaLandmark,
  FaKey,
  FaArrowsSpin,
  FaHatCowboy,
  FaBriefcase,
  FaCartShopping,
  FaCar,
  FaHandHoldingDollar,
  FaArrowTrendUp,
};

export const LOAN_ICON_NAMES: string[] = Object.keys(LOAN_ICONS);

export function getLoanIcon(name?: string, fallback: IconType = FaCheck): IconType {
  return (name ? LOAN_ICONS[name] : undefined) ?? fallback;
}
