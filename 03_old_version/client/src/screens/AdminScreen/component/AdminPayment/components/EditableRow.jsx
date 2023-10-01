import React from "react";

export const TrackingNumber = ({
  result,
  checkedInputs,
  inputWrite,
  handleTrackingNumberWrite,
}) => {
  return (
    <td>
      <div className="">
        {result.trackingNumber !== null &&
        result.trackingNumber.length !== 0 ? (
          result.trackingNumber.map((x, i) => {
            // console.log(x, i, "TrackingNumber");
            return (
              <div className="myOrder__Box" key={`${result.orderId}_${i}`}>
                <div className="product__price">{x}</div>
              </div>
            );
          })
        ) : result.isPaid === false ? (
          ""
        ) : checkedInputs.includes(result.orderId) ? (
          <input
            autoFocus
            // ref={props.autoFocus} autoFocus를 안주면 렌더링할때마다 포커스를 잃는다
            type="text"
            name={result.orderId}
            value={inputWrite[result.orderId]}
            placeholder="송장번호를 적어주세요"
            onChange={handleTrackingNumberWrite}
          />
        ) : (
          "배송준비중"
        )}
      </div>
    </td>
  );
};
