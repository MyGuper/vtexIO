import React from "react"

import { useProduct } from 'vtex.product-context'

import { useRewards } from "../../hooks/useRewards";
import styles from "./styles.css"

export default function Cashback() {
  const productContext = useProduct();

  const { selectedItem, selectedQuantity } = productContext ?? {}

  const price = selectedItem?.sellers?.[0]?.commertialOffer?.ListPrice

  const items = selectedItem && selectedQuantity && price ? [{ id: selectedItem.itemId, name: selectedItem.name, quantity: selectedQuantity, price }] : undefined

  const { data } = useRewards(items)

  const cashbackValue = data?.cashback?.thisOrder?.accumulating?.total
  
  if(!cashbackValue) return <></>;

  return (
    <div className={styles.container}>Gane $ {(cashbackValue / 100).toFixed(2)} de CASHBACK *</div>
  )
}