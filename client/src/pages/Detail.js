import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_MINIATURES,
} from '../utils/actions';
import { QUERY_MINIATURES } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentMiniature, setCurrentMiniature] = useState({});

  const { loading, data } = useQuery(QUERY_MINIATURES);

  const { miniatures, cart } = state;

  useEffect(() => {
    // already in global store
    if (miniatures.length) {
      setCurrentMiniature(miniatures.find((miniature) => miniature._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_MINIATURES,
        miniatures: data.miniatures,
      });

      data.miniatures.forEach((miniature) => {
        idbPromise('miniatures', 'put', miniature);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('miniatures', 'get').then((indexedMiniatures) => {
        dispatch({
          type: UPDATE_MINIATURES,
          miniatures: indexedMiniatures,
        });
      });
    }
  }, [miniatures, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        miniature: { ...currentMiniature, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentMiniature, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentMiniature._id,
    });

    idbPromise('cart', 'delete', { ...currentMiniature });
  };

  return (
    <>
      {currentMiniature && cart ? (
        <div className="container my-1">
          <Link to="/gallery">← Back to Miniatures</Link>

          <h2>{currentMiniature.name}</h2>

          <p>{currentMiniature.description}</p>

          {/* <p>
            <strong>Price:</strong>${currentMiniature.price}{' '}
            <button onClick={addToCart}>Add to Cart</button>
            <button
              disabled={!cart.find((p) => p._id === currentMiniature._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p> */}

          <img
            src={`/images/${currentMiniature.image}`}
            alt={currentMiniature.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}
// add comments to this page
export default Detail;
