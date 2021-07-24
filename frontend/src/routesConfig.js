// import Home from './components/home/Home';
import Menu from './components/menu/Menu';
import Category from './components/menu/Category';
import Product from './components/menu/Product';

const routes = [
    { path: "/menu", name: "Menu", Component: Menu},
    { path: "/menu/:mainCategoryId/:categoryId", name: "Category", Component: Category},
    { path: "/menu/:mainCategoryId/:categoryId/:subCategoryId/:productId", name: "Product", Component: Product}, 
];

export default routes;


  