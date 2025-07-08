import React from "react";

import { useRenderSession } from 'vtex.session-client';

import { useRewards } from "../../hooks/useRewards";

import styles from "./styles.css";

export default function RewardsTopBar({typeHeader}: {typeHeader: string}) {
  console.log("typeHeader",typeHeader)
  const { data } = useRewards()
  const { session } = useRenderSession() as any

  const total = data?.cashback?.userBalance?.total
  const email = session?.namespaces?.profile?.email?.value

  if(!email) {
    return <></>;
  }

  const formattedTotal = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
  }).format((total || 0) / 100);

  const message = typeHeader
    ? `Mi Cashback: ${formattedTotal}`
    : `Mi Saldo Cashback: ${formattedTotal}`;


  return (
    <div className={ typeHeader ? styles.topBarContainerHeader : styles.topBarContainer}>
      {total !== undefined && <span className={styles.popupPoints}>{message}</span>}
      {!typeHeader && <span className={styles.popupEmail}>{email}</span>}
    </div>
  )
}
