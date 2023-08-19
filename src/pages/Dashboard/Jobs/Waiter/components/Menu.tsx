import { useState } from 'react';
import { getCategories, getProductsByCategory } from '../../../../../api/waiter';
import { CategoryDto, MenuDto, ProductDto } from '../../../../../models/waiter.model';
import { useQuery } from '@tanstack/react-query';
import { handleAddProduct } from '../../../../../helpers/Waiter/helper';

export const Menu: React.FC<MenuDto> = ({ setOrders, orders }) => {
  const [category, setCategory] = useState("bebidas");
  const categoriesQuery = useQuery(['categories'], getCategories);
  const productsByCategoryQuery = useQuery(['products', category], () => getProductsByCategory(category));

  return (
    <div className="menu-container">
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        {
          categoriesQuery.isLoading ?
            <p>Cargando...</p>
            :
            categoriesQuery.data.map(({ tag, category, id }: CategoryDto, i: number) => (
              <li key={id} className="nav-item" role="presentation">
                <button
                  className={`nav-link ${i === 0 ? 'active' : ''}`}
                  id={`tab-${tag}`}
                  data-bs-toggle="tab"
                  data-bs-target={`#${i === 0 ? 'home' : tag}`}
                  type="button"
                  role="tab"
                  aria-controls={`${i === 0 ? 'home' : tag}`}
                  aria-selected={`${i === 0 ? 'true' : 'false'}`}
                  onClick={() => setCategory(tag)}
                >
                  {category}
                </button>
              </li>
            ))
        }
      </ul>
      <div className="tab-content" id="myTabContent">
        {
          productsByCategoryQuery.isLoading ?
            <p>Cargando...</p>
            :
            categoriesQuery.data.map(({ id, tag }: CategoryDto, i: number) => (
              <div
                id={`${i === 0 ? 'home' : tag}`}
                key={id}
                className={`tab-pane fade ${i === 0 ? 'show active' : ''} `}
                role="tabpanel"
                aria-labelledby={`tab-${tag}`}>
                <div className='d-flex flex-wrap'>
                  {
                    productsByCategoryQuery.isLoading ?
                      <p>Cargando...</p>
                      :
                      productsByCategoryQuery.data.map(({ id: idProduct, image, name, price }: ProductDto) => (
                        <div key={idProduct}
                          className="product-card d-flex flex-column justify-content-center align-items-center"
                          onClick={() => {
                            handleAddProduct(idProduct, name, price, orders, setOrders)
                          }}
                        >
                          <img src={image} alt={name} />
                          <div className="product-card-content">
                            <p>{name}</p>
                            <p>${price}</p>
                          </div>
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
