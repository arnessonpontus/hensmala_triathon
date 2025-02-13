import styled from "styled-components";
import { CartItem } from "../models";
import SmallCartItem from "./SmallCartItem";
import { isProductRegistration } from "../utils";

const ListContainer = styled.div`
  padding: 10px 0;
`;

export const CartItemList = ({ items }: { items: CartItem[] }) => {
  if (items.length < 1) {
    return null;
  }
  return (
    <ListContainer>
      <h5>Dina produkter</h5>
      {items.map(item => <SmallCartItem isDeletable={!isProductRegistration(item)} item={item} />)}
    </ListContainer>
  );
}
