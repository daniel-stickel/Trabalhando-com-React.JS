import { IProduct } from "../../../types/Product";
import { ProductCategoryRow } from "../ProductCategoryRow";
import { ProductRow } from "../ProductRow";

interface IProps {
    products: IProduct[];
    isInStockOnly: boolean;
    filterText: string;
}

export function ProductTable(props: IProps) {
    function getRows() {
        const rows: JSX.Element[] = [];
        let lastCategory = "";

        props.products.forEach(product => {
            // Verificar se o nome do produto está de acordo com o filtro
            if (!product.name.includes(props.filterText)) {
                return;
            }

            // Verificar se o produto está em estoque
            if (props.isInStockOnly && !product.stocked) {
                return;
            }

            // Linha da categoria
            if (lastCategory !== product.category) {
                rows.push(<ProductCategoryRow product={product} />)                
            }

            // Linha do produto
            rows.push(<ProductRow product={product} />)

            lastCategory = product.category;
        });

        return rows
    }

    return (
        <table>
            <tr>
                <th>Name</th>
                <th>Price</th>
            </tr>
            {getRows()}
        </table>
    );
}