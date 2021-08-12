import * as actionTypes from "./shopping-types";
import {ServiceData, GoodsData} from "../../testData";
import {IMMUTABLE_TYPES, TYPES_OF_GOODS} from "./shopping-types";

const INITIAL_STATE = {
    products: [
        ...GoodsData.filter(item => item.id > 3),
        {
            id: 1,
            title: "This is the COOLEST Cube Ever",
            type: "good",
            description:
                "This cube will keep you busy the entire day and it is very fun to play with",
            price: 15.0,
            image:
                "https://images.unsplash.com/photo-1591991731833-b4807cf7ef94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        },
        {
            id: 2,
            title: "Large Coffee Cup",
            type: "good",
            description:
                "Get a big cup of coffee every morning before the day starts",
            price: 20.0,
            image:
                "https://images.unsplash.com/photo-1572119865084-43c285814d63?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        },
        {
            id: 3,
            title: "Books That CHANGED My Life",
            type: "good",
            description:
                "These books will keep you busy all throughout the entire lockdown and give you some great advise from famous people",
            price: 150.0,
            image:
                "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1374&q=80",
        },
    ], // {id, title, description, price, img}
    services: [...ServiceData],
    cart: [], // {id, title, description, price, img, qty}
    currentItem: null,
    currentCategory: null,
    total_pages: 0,
    page: 0,
}

const shopReducer = (state = INITIAL_STATE, {type, payload}) => {
    switch (type){
        case actionTypes.ADD_TO_CART:
            let item;
            switch(payload.type){
                case TYPES_OF_GOODS.good:
                    item = state.products.find(prod => prod.id === payload.id);
                    break;
                case TYPES_OF_GOODS.service:
                    item = state.services.find(serv => serv.id === payload.id);
                    break;
                default:
                    return state;
            }
            //get the items from the products array

            //check if item is in cart already
            const isInCart = state.cart.find(item => item.id === payload.id && item.type === payload.type);

            return {
                ...state,
                cart: isInCart?
                    state.cart.map(
                        item => (item.id === payload.id && !IMMUTABLE_TYPES.includes(item.type)?
                            {...item, qty: item.qty+1}
                            : item)
                    ):
                    [...state.cart, {...item, qty: 1}],
            };
        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cart:
                    state.cart.filter(item => !(item.id === payload.id && item.type === payload.type))
            };
        case actionTypes.ADJUST_QTY:
            return {
                ...state,
                cart: IMMUTABLE_TYPES.includes(payload.type)? [...state.cart] :
                    state.cart.map(item =>
                        item.id === payload.id && item.type === payload.type
                            ? { ...item, qty: +payload.qty }
                            : item
                    )
            };
        case actionTypes.LOAD_CURRENT_ITEM:
            return {
                ...state,
                currentItem: payload
            };
        default:
            return state;
    }
};

export default shopReducer;