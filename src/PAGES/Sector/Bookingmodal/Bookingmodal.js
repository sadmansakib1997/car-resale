import React from "react";

const Bookingmodal = ({ cars, setcars }) => {
  const handlebooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const time = form.time.value;
    const name = form.name.value;

    const price = form.price.value;
    const email = form.email.value;
    const phone = form.phone.value;

    const booking = {
      time,
      name: cars.name,
      username: name,
      email,

      phone,
      price,
    };
    console.log(booking);
    setcars(null);
  };
  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal ">
        <div className="modal-box relative bg-slate-800">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-2xl font-bold text-yellow-500">{cars.name}</h3>
          <form onSubmit={handlebooking} className="grid grid-cols-1 gap-5">
            <span className="label-text text-xl font-semibold mt-3 text-red-500">
              Posted Time:
            </span>
            <input
              type="text"
              name="time"
              disabled
              value={cars.time}
              className="input w-full"
            />
            <span className="label-text text-xl font-semibold text-red-500">
              User Name:
            </span>
            <input
              name="name"
              type="text"
              disabled
              defaultValue={cars.sellername}
              placeholder="Your name"
              className="input w-full"
            />

            <span className="label-text text-xl font-semibold text-red-500">
              Price:
            </span>
            <input
              name="price"
              type="text"
              disabled
              defaultValue={cars.orginalprice}
              className="input w-full"
            />
            <span className="label-text text-xl font-semibold text-red-500">
              User email:
            </span>
            <input
              name="email"
              type="email"
              disabled
              placeholder="Your Email"
              className="input w-full"
            />
            <span className="label-text text-xl font-semibold text-red-500">
              Phone:
            </span>
            <input
              name="phone"
              type="number"
              placeholder="Your phonenumber"
              className="input w-full"
            />

            <input
              className="btn btn-accent text-xl text-white"
              type="submit"
              value="submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Bookingmodal;
