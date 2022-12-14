import styled from 'styled-components'

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
`

export const ImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;
`

export const ItemImage = styled.img`
  width: 100%;
  height: 100%;
`

export const Name = styled.span`
  width: 23%;
`

export const Price = styled.span`
  width: 23%;
`

export const QuantityContainer = styled.div`
  width: 23%;
  display: flex;
`

export const QuantityArrow = styled.div`
  cursor: pointer;
  user-select: none;
`

export const Quantity = styled.span`
  margin: 0 10px;
`

export const RemoveButton = styled.div`
  padding-left: 12px;
  cursor: pointer;
  user-select: none;
`
