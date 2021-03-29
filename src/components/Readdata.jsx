import React, { useState, useEffect } from 'react';
import { fireData } from '../fire';

export default function Readdata() {
  const [data, setData] = useState([]);

  useEffect(() => {
    createData();
  }, []);

  const createData = async () => {
    const ref = await fireData.database().ref();
    await ref.on(
      'value',
      async function (snapshot) {
        const store = await snapshot.val();

        // console.log(Object.entries(store));

        setData(Object.entries(store));
      },
      function (error) {
        console.log('Error: ' + error.code);
      }
    );
  };

  const deleteData = (e) => {
    // console.log(e.target.getAttribute('deleteAtr'));
    const val = e.target.getAttribute('deleteAtr');

    fireData.database().ref(val).remove();
  };

  const updateData = (e) => {
    const update = e.target.previousSibling.value;
    const val = e.target.getAttribute('update');

    console.log(val);
    fireData.database().ref(val).set(update);
    e.target.previousSibling.value = '';
  };

  function objectgeneration(obj, dataAtr) {
    return Object.entries(obj).map((item, i) => {
      //   console.log(item);

      return (
        <ul key={i}>
          <li>
            <div className="data-read-items">
              <div className="read-item">{item[0]}</div>
              <div className="read-item">
                {item[1]}
                <input></input>
                <button
                  onClick={updateData}
                  update={dataAtr + '/' + item[0]}
                  className={`del-btn`}
                >
                  update
                </button>
              </div>
              <button
                deleteAtr={dataAtr + '/' + item[0]}
                onClick={deleteData}
                className={`del-btn`}
              >
                delete
              </button>
            </div>
          </li>
        </ul>
      );
    });
  }

  return (
    <div className="read-data">
      {data.map((item, i) => {
        return (
          <ul key={i}>
            <li>
              <li>{item[0]}</li>
              {typeof item[1] === 'object' &&
              !Array.isArray(item[1]) &&
              item[1] !== null ? (
                objectgeneration(item[1], item[0])
              ) : (
                <li>
                  {item[1]}
                  <input></input>
                  <button
                    onClick={updateData}
                    update={item[0] + '/' + item[0]}
                    className={`del-btn`}
                  >
                    update
                  </button>
                </li>
              )}
            </li>
            <button deleteAtr={item[0]} onClick={deleteData}>
              delete
            </button>
          </ul>
        );
      })}
    </div>
  );
}
