import ProductItem from "./ProductItem.js";
import classes from "./Products.module.css";

const Products = () => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        <ProductItem
          title="Test"
          price={6}
          description="This is a first product - amazing!"
          key={1}
        />
        <ProductItem
          title="Another one"
          price={10}
          description="Pretty expensive, huh?"
          key={2}
        />
        <ProductItem
          title="Cheap product"
          price={1}
          description="Not very usefull"
          key={3}
        />
      </ul>
    </section>
  );
};

export default Products;
