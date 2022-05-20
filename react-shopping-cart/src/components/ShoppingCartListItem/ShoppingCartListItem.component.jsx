import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import FlexBox from 'components/@shared/FlexBox/FlexBox.component';
import CheckBox from 'components/@shared/CheckBox/CheckBox.component';
import Image from 'components/@shared/Image/Image.component';
import TextBox from 'components/@shared/TextBox/TextBox.component';
import ChangeQuantityButton from 'components/ChangeQuantityButton/ChangeQuantityButton.component';
import { ReactComponent as TrashCan } from 'assets/images/trashCan.svg';
import { addSpecificItem, deleteSpecificItem } from 'redux/actions/orderList.action';
import { deleteItem, increaseQuantity, decreaseQuantity } from 'redux/actions/shoppingCart.action';

const CartItemContainer = styled(FlexBox).attrs({
  gap: '15px',
})`
  width: 736px;
  padding: 20px 0;
  border-top: 1px solid ${({ theme }) => theme.colors['GRAY_001']};

  ${TextBox} {
    flex-grow: 1;
  }
`;

function ShoppingCartListItem({ id, name, thumbnail, price, quantity }) {
  const dispatch = useDispatch();
  const orderList = useSelector(state => state.orderList);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(orderList.some(productId => productId === id));
  }, [orderList]);

  const handleChangeCheckBox = id => {
    if (checked) {
      dispatch(deleteSpecificItem(id));
    } else {
      dispatch(addSpecificItem(id));
    }
  };

  const itemDeleteConfirm = id => {
    if (window.confirm('장바구니에서 삭제하시겠습니까?')) {
      dispatch(deleteItem(id));
      dispatch(deleteSpecificItem(id));
    }
  };

  return (
    <CartItemContainer>
      <CheckBox checked={checked} onChange={() => handleChangeCheckBox(id)} />
      <Image type="small" src={thumbnail} />
      <TextBox className="product-name" fontSize="small">
        {name}
      </TextBox>
      <FlexBox direction="column" gap="20px" alignItems="flex-end">
        <TrashCan cursor="pointer" onClick={() => itemDeleteConfirm(id)} />
        <ChangeQuantityButton
          quantity={quantity}
          onClickAddProduct={() => dispatch(increaseQuantity(id))}
          onClickReduceProduct={() => dispatch(decreaseQuantity(id))}
        />
        <TextBox className="product-price" fontSize="medium">
          {price.toLocaleString()}원
        </TextBox>
      </FlexBox>
    </CartItemContainer>
  );
}

export default React.memo(ShoppingCartListItem);
