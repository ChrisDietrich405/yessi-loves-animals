import CartModel from "../../models/cart";
import { NextResponse } from "next/server";

//THIS WOULD BE THE CART ICON BUTTON

export const GET = async (req) => {
  try {
    const requestHeaders = new Headers(req.headers);

    const userId = requestHeaders.get("x-decoded-id");

    if (!userId || userId === "undefined") {
      return NextResponse.json(
        { message: "Unauthorized user" },
        { status: 401 }
      );
    }

    const foundCart = await CartModel.findOne({ userId });

    if (!foundCart) {
      return NextResponse.json(
        { message: "Cart not found", cart: [] },
        { status: 200 }
      );
    }

    return NextResponse.json(foundCart, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

//THIS IS TO CREATE A CART OR IF THE CART ALREADY EXISTS TO UPDATE IT (THE POST METHOD CAN DO BOTH)
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!I NEED TO ADD FUNCTIONALITY TO ADD A MORE THAN ONE ITEM TO THIS CART

// export const POST = async (req) => {

//   const requestHeaders = new Headers(req.headers);

//   const userId = requestHeaders.get("x-decoded-id");

//   if (!userId) {
//     return NextResponse.json({ message: "Unauthorized user" }, { status: 401 });
//   }

//   const previousCart = await CartModel.findOne({ userId: userId });

//   //this logic is to replace the first item in the cart with another item
//   const body = await req.json();
//   let result;
//   if (!previousCart) {
//     result = await CartModel.create(body);
//   } else {
//     result = await CartModel.findOneAndUpdate(
//       { userId: userId },
//       { $set: { items: body.items } },
//       { returnOriginal: false }
//     );
//   }

//   return NextResponse.json({ success: true, data: result }, { status: 201 });
// };

// export const POST = async (req) => {
//   const requestHeaders = new Headers(req.headers);

//   const userId = requestHeaders.get("x-decoded-id");
//   console.log(userId);

//   // if (!userId) {
//   //   return NextResponse.json({ message: "Unauthorized user" }, { status: 401 });
//   // }

//   const previousCart = await CartModel.findOne({ userId });

//   const updatedCartItems = previousCart.items.map((item) => {
//     const existingItem = previousCart.items.find(
//       (newItem) => newItem.productId === item.productId
//     );
//     if (existingItem) {
//       return {
//         ...item,
//         quantity: item.quantity + existingItem.quantity,
//         price: item.price + existingItem.price * existingItem.quantity,
//       };
//     }
//     return item;
//   });

//   const newItems = updatedCartItems.items.filter(
//     (newItem) =>
//       !previousCart.items.some((item) => newItem.productId === item.productId)
//   );

//   console.log(newItems);

//   // const combinedItems = [...updatedCartItems, ...newItems];

//   // result = await CartModel.findOneAndUpdate(
//   //   { userId: userId },
//   //   { $set: { items: combinedItems } },
//   //   { returnOriginal: false }
//   // );

//   //this logic is to replace the first item in the cart with another item
//   // const body = await req.json();
//   // let result;
//   // if (!previousCart) {
//   //   result = await CartModel.create(body);
//   // } else {
//   //   result = await CartModel.findOneAndUpdate(
//   //     { userId: userId },
//   //     { $set: { items: body.items } },
//   //     { returnOriginal: false }
//   //   );
//   // }

//   // const body = await req.json();
//   // let result;
//   // if (!previousCart) {
//   //   result = await CartModel.create(body);
//   // } else {
//   //   result = await CartModel.findOneAndUpdate(
//   //     { userId: userId },
//   //     { $set: { items: body.items } },
//   //     { returnOriginal: false }
//   //   );
//   // }
//   // console.log("hello", result);

//   return NextResponse.json({ success: true, data: result }, { status: 201 });
// };

export const POST = async (req) => {
  const requestHeaders = new Headers(req.headers);

  const userId = requestHeaders.get("x-decoded-id");
  

  // Uncomment this section to ensure authorization is checked
  // if (!userId) {
  //   return NextResponse.json({ message: "Unauthorized user" }, { status: 401 });
  // }

  // Get previous cart for the user
  const previousCart = await CartModel.findOne({ userId });

  // Parse the request body to get the new items
  const body = await req.json();
  const newItems = body.items;

  // If there's no previous cart, create a new cart with the provided items
  if (!previousCart) {
    const result = await CartModel.create({ userId, items: newItems });
    return NextResponse.json({ success: true, data: result }, { status: 201 });
  }

  // Update existing items or add new items to the cart
  const updatedItemsMap = new Map();

  // Add existing items to the map
  previousCart.items.forEach((item) => {
    updatedItemsMap.set(item.productId, { ...item });
  });

  // Merge new items with existing items
  newItems.forEach((newItem) => {
    const existingItem = updatedItemsMap.get(newItem.productId);
    if (existingItem) {
      // Update quantity and price if item already exists
      existingItem.quantity += newItem.quantity;
      existingItem.price += newItem.price * newItem.quantity;
    } else {
      // Add new item to the map
      updatedItemsMap.set(newItem.productId, { ...newItem });
    }
  });

  // Convert map back to an array
  const combinedItems = Array.from(updatedItemsMap.values());

  // Update the cart with combined items
  const result = await CartModel.findOneAndUpdate(
    { userId },
    { $set: { items: combinedItems } },
    { returnOriginal: false, new: true } // Ensure the updated document is returned
  );

  console.log("Updated Cart:", result);

  return NextResponse.json({ success: true, data: result }, { status: 201 });
};


export const DELETE = async (req) => {
  // Extracting the headers from the request
  const requestHeaders = new Headers(req.headers);

  // Extracting the userId from headers
  const userId = requestHeaders.get("x-decoded-id");

  // Check if userId is available
  if (!userId) {
    return NextResponse.json(
      { message: "User ID is missing in the headers." },
      { status: 400 }
    );
  }

  // try {
  //   // Parse the request body to extract the item ID
  const { id } = await req.json();
  // console.log("hello Leticia", items[0].itemId);

  // const itemId = items[0].itemId;
  // console.log("itemId", itemId);

  // Check if itemId is provided
  if (!id) {
    return NextResponse.json(
      { message: "Cart ID is missing in the request body." },
      { status: 400 }
    );
  }

  await CartModel.deleteOne({ _id: id });

  return NextResponse.json({ message: "Cart removed successfully." });

  //   // Check if the item was removed successfully
  //   if (!result) {
  //     return NextResponse.json(
  //       { message: "Cart item not found or already removed." },
  //       { status: 404 }
  //     );
  //   }

  //   return NextResponse.json({ message: "Item removed successfully." });
  // } catch (error) {
  //   console.error("Error removing item from cart:", error);
  //   return NextResponse.json(
  //     { message: "Internal server error" },
  //     { status: 500 }
  //   );
  // }
};

export const PUT = async (req) => {
  // Extracting the headers from the request
  const requestHeaders = new Headers(req.headers);

  // Extracting the userId from headers
  const userId = requestHeaders.get("x-decoded-id");

  // Check if userId is available
  if (!userId) {
    return NextResponse.json(
      { message: "User ID is missing in the headers." },
      { status: 400 }
    );
  }

  const { items } = await req.json();

  const updatedCart = await CartModel.findOneAndUpdate(
    { userId: userId },
    { $set: { items: items } },
    { returnOriginal: false }
  );

  return NextResponse.json({ message: "Item updated successfully." });

  // const itemId = items[0].itemId;
  // // console.log("itemId", itemId);

  // // Check if itemId is provided
  // if (!itemId) {
  //   return NextResponse.json(
  //     { message: "Item ID is missing in the request body." },
  //     { status: 400 }
  //   );
  // }

  // await CartModel.deleteOne(itemId);

  // return NextResponse.json({ message: "Item removed successfully." });

  //   // Check if the item was removed successfully
  //   if (!result) {
  //     return NextResponse.json(
  //       { message: "Cart item not found or already removed." },
  //       { status: 404 }
  //     );
  //   }

  //   return NextResponse.json({ message: "Item removed successfully." });
  // } catch (error) {
  //   console.error("Error removing item from cart:", error);
  //   return NextResponse.json(
  //     { message: "Internal server error" },
  //     { status: 500 }
  //   );
  // }
};
