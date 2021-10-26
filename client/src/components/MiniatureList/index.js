import React, { useEffect } from 'react';
import MiniatureItem from '../MiniatureItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_MINIATURES } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_MINIATURES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function MiniatureList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_MINIATURES);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_MINIATURES,
        miniatures: data.miniatures,
      });
      data.miniatures.forEach((miniature) => {
        idbPromise('miniatures', 'put', miniature);
      });
    } else if (!loading) {
      idbPromise('miniatures', 'get').then((miniatures) => {
        dispatch({
          type: UPDATE_MINIATURES,
          miniatures: miniatures,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterMiniatures() {
    if (!currentCategory) {
      return state.miniatures;
    }

    return state.miniatures.filter(
      (miniature) => miniature.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Miniatures:</h2>
      {state.miniatures.length ? (
        <div className="flex-row">
          {filterMiniatures().map((miniature) => (
            <MiniatureItem
              key={miniature._id}
              _id={miniature._id}
              image={miniature.image}
              name={miniature.name}
              // price={miniature.price}
              // quantity={miniature.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any miniatures yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default MiniatureList;
