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

export const ImageColumnContainer = styled.div`
  width: 23%;
  padding-right: 15px;
`

export const ImageColumn = styled.img`
  width: 100%;
  height: 100%;
`

export const Column = styled.span`
  width: 23%;
`

export const QuantityColumnContainer = styled.div`
  width: 23%;
  display: flex;
`

export const Arrow = styled.div`
  user-select: none;
  cursor: pointer;
`

export const Quantity = styled.span`
  margin: 0 10px;
`

export const RemoveButton = styled.div`
  padding-left: 12px;
  cursor: pointer;
`
