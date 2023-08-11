import { useEffect, useState } from 'react';
import { getCategories, getProductsByCategory } from '../../../../../api/waiter';
import { CardSkeleton } from '../../../../../components/Skeletons/CardSkeleton';
import { CategoryDto, MenuDto, OrderDto, ProductDto } from '../../../../../models/waiter.model';


export const Menu: React.FC<MenuDto> = ({ setOrders, orders }) => {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loading, setLoading] = useState(false);

  const GetCategories = async () => {
    try {
      const dataCategories = await getCategories();
      setCategories(dataCategories);
      const dataProducts = await getProductsByCategory(dataCategories[0].tag);
      setProducts(dataProducts);
      setLoading(true);
    } catch (err) {
      console.warn(err);
      setLoading(false);

    }
  };

  const GetProductsByCategory = async (category: string) => {
    try {
      const dataProducts = await getProductsByCategory(category);
      setProducts(dataProducts);
      setLoading(true);
    } catch (err) {
      console.warn(err);
      setLoading(false);
    }
  }

  const handleAddProduct = (product: ProductDto) => {
    const existingProduct = orders.find((item) => item.id === product.id);

    if (existingProduct) {
      setOrders((prevOrder: OrderDto[]) =>
        prevOrder.map((item) =>
          item.id === product.id ? { ...item, quantity: (parseInt(item.quantity) + 1).toString() } : item
        )
      );
      return
    }

    const newOrderItem: OrderDto = {
      id: product.id,
      product: product.name,
      price: product.price,
      quantity: "1"
    };
    setOrders((prevOrder: OrderDto[]) => [...prevOrder, newOrderItem]);
  };

  useEffect(() => {
    GetCategories()
  }, []);

  return (
    <div className="menu-container">

      <ul className="nav nav-tabs" id="myTab" role="tablist">
        {
          categories.map((category, i) => (
            <li key={category.id} className="nav-item" role="presentation">
              <button
                className={`nav-link ${i === 0 ? 'active' : ''}`}
                id={`tab-${category.tag}`}
                data-bs-toggle="tab"
                data-bs-target={`#${i === 0 ? 'home' : category.tag}`}
                type="button"
                role="tab"
                aria-controls={`${i === 0 ? 'home' : category.tag}`}
                aria-selected={`${i === 0 ? 'true' : 'false'}`}
                onClick={() => GetProductsByCategory(category.tag)}
              >
                {category.category}
              </button>
            </li>
          ))
        }

      </ul>

      <div className="tab-content" id="myTabContent">
        {
          categories.map((category, i) => (
            <div
              key={category.id}
              className={`tab-pane fade ${i === 0 ? 'show active' : ''} `}
              id={`${i === 0 ? 'home' : category.tag}`}
              role="tabpanel"
              aria-labelledby={`tab-${category.tag}`}>
              <div className='d-flex flex-wrap'>

                {
                  products.map((product) => (
                    <div key={product.id}
                      className="product-card d-flex flex-column justify-content-center align-items-center"
                      onClick={() => { handleAddProduct(product) }}
                    >
                      {loading ?
                        <>
                          <img src={product.image} alt={product.name} />
                          <div className="product-card-content">
                            <p>{product.name}</p>
                            <p>${product.price}</p>
                          </div>
                        </>
                        :
                        <CardSkeleton />
                      }
                    </div>
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};
