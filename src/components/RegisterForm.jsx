import React, { useState, useRef, useEffect } from 'react';
import { fireData } from '../fire';

export default function RegisterYourCatForm() {
  const divInputs = useRef(null);
  const [values, setValues] = useState({});
  const [reset, setReset] = useState(false);
  const [mainValue, setmainValue] = useState('');
  const [secondValue, setSecondValue] = useState('');

  const [createChile, setcreateChile] = useState([]);
  const [count, setCount] = useState(0);
  const [fireError, setFireError] = useState(false);
  const [exist, setExist] = useState(false);

  const regex = new RegExp(/^[^.#$\/\[\]]+$/); // Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]" from firebase

  useEffect(() => {
    childGenerate(count);
  }, [count]);

  useEffect(() => {
    if (mainValue.length && Object.keys(values).length !== 0 && !exist) {
      fireData.database().ref(mainValue).set(values);
      setReset(!reset);
    }

    if (mainValue.length && Object.keys(values).length !== 0 && exist) {
      fireData.database().ref(mainValue).update(values);
      setReset(!reset);
    }
  }, [values]);

  useEffect(() => {
    if (mainValue.length) {
      chackDataExist(mainValue);
    }

    async function chackDataExist(str) {
      const ref = await fireData.database().ref(str);

      await ref.on(
        'value',
        async function (snapshot) {
          if ((await snapshot.val()) !== null) {
            setExist(true);
          } else {
            setExist(false);
          }
        },
        function (error) {
          console.log('Error: ' + error.code);
        }
      );
    }
  }, [mainValue]);

  useEffect(() => {
    setValues({});
    setCount(0);
    setmainValue('');
    setSecondValue('');
  }, [reset]);

  const addChild = () => {
    if (count === 0 && mainValue.length) {
      fireData
        .database()
        .ref(mainValue)
        .set(secondValue)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
      return;
    }
    const inputs = divInputs.current.childNodes;
    const valuenodeList = Object.values(inputs).map((i) => i.childNodes);

    console.log(regex.test('dadsa'));

    let store = Object.values(valuenodeList).map((i) => {
      if (regex.test(Object.values(i)[0].value)) {
        return { [Object.values(i)[0].value]: Object.values(i)[1].value };
      } else {
        setFireError(true);
        return false;
      }
    });

    console.log(store);

    const cheakData = (arr) => {
      for (let i = 0; i < arr.length; i++) {
        const el = arr[i];
        if (el) {
          setValues((old) => {
            return {
              ...old,
              ...el,
            };
          });
        } else {
          setValues({});
          break;
        }
      }
    };

    cheakData(store);

    // setReset(!reset);
  };

  function childGenerate(number) {
    // setchildCount((old) => [...old, number]);

    setcreateChile(Array(number).fill(0));
  }

  const removeChild = (i) => {
    console.log(i);
    setcreateChile(
      createChile.filter((item, index) => {
        return index !== i;
      })
    );
  };

  return (
    <form>
      <div className="title">
        <h2>Register Your Cat</h2>

        {regex.test(mainValue) && (
          <div className="button_cont" align="center" onClick={addChild}>
            {exist && <h5>this value is exist in database</h5>}

            <a className="example_f">
              {!exist ? (
                <span>Submit data to fitrbase</span>
              ) : (
                <span>Update data</span>
              )}
            </a>
          </div>
        )}
      </div>

      {fireError && (
        <h5>
          Keys must be non-empty strings and can't contain ".", "#", "$", "/",
          "[", or "]"
        </h5>
      )}

      <div>
        <li>
          <input
            onChange={(e) => setmainValue(e.target.value)}
            value={mainValue}
          ></input>
          {count === 0 ? (
            <input
              onChange={(e) => setSecondValue(e.target.value)}
              value={secondValue}
            ></input>
          ) : (
            <></>
          )}
        </li>

        <ul ref={divInputs}>
          {/* {!emptyVal ? <h4>YOU HAVE SOME EMPTY INPUTS</h4> : <></>} */}

          {Object.keys(createChile).map((item, i) => {
            if (i === 0 && secondValue.length) {
              return (
                <li key={i}>
                  <input
                    onChange={(e) => setSecondValue(e.target.value)}
                    value={secondValue}
                  ></input>
                  <input></input>
                </li>
              );
            }
            return (
              <li key={i} className="child">
                <input className="child-inp"></input>
                <input className="child-inp"></input>
                {/* <button
                  type="button"
                  onClick={() => {
                    removeChild(i);
                  }}
                >
                  remove
                </button> */}
              </li>
            );
          })}
        </ul>
      </div>

      <button
        type="button"
        onClick={() => {
          setCount(count + 1);
          childGenerate(count);
        }}
      >
        create child
      </button>

      {count !== 0 ? (
        <button
          type="button"
          onClick={() => {
            setCount(count - 1);
            childGenerate(count);
          }}
        >
          remove last child
        </button>
      ) : (
        <></>
      )}
    </form>
  );
}
