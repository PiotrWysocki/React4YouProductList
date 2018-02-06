import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ProductCategoryRow extends Component {
    render(){
        const category = this.props.category;
        return(
            <tr>
                <th colSpan="2">
                    {category}
                </th>
            </tr>
        );
    }
}

class ProductRow extends Component {
    render(){
        const product = this.props.product;
        const name = product.stocked ?
            product.name :
            <span style={{color: 'red'}}>
                {product.name}
            </span>;

            return (
                <tr>
                    <td>{name}</td>
                    <td>{product.price}</td>
                </tr>
            );
    }
}

class ProductTable extends Component {
    render(){
        const filterText = this.props.filterText;
        const inStockOnly = this.props.inStockOnly;

        const rows = [];
        let lastCategory = null;

        this.props.products.forEach((product) => {
            if(product.name.indexOf(filterText) === -1){
                return;
            }
            if(inStockOnly && !product.stocked){
                return;
            }
            if(product.category !== lastCategory){
                rows.push(
                    <ProductCategoryRow
                        category={product.category}
                        key={product.category}/>
                );
            }
            rows.push(
                <ProductRow
                    product={product}
                    key={product.name}/>
            );
            lastCategory = product.category;
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th>Nazwa</th>
                        <th>Cena</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class SearchBar extends Component {
    constructor(props){
        super(props);

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(e){
        this.props.onFilterTextChange(e.target.value);
    }

    handleInStockChange(e){
        this.props.onInStockChange(e.target.checked);
    }

    render(){
        return(
            <form>
                <input type="text"
                       placeholder="Wyszukaj..."
                       value={this.props.filterText}
                       onChange={this.handleFilterTextChange}
                       />
                <p>
                    <input type="checkbox"
                           checked={this.props.inStockOnly}
                           onChange={this.handleInStockChange}/>
                    {' '}
                    Pokaż tylko dostępne produkty
                </p>
            </form>
        );
    }
}

class FilterableProductTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false
        };

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(filterText){
        this.setState({
            filterText
        });
    }

    handleInStockChange(inStockOnly){
        this.setState({
            inStockOnly
        });
    }

    render(){
        return (
            <div className="main">
                <div className="search-bar">
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onFilterTextChange={this.handleFilterTextChange}
                    onInStockChange={this.handleInStockChange}/>
                </div>
                <div className="product-table">
                <ProductTable products={this.props.products}
                              filterText={this.state.filterText}
                              inStockOnly={this.state.inStockOnly}/>
                </div>
            </div>
        );
    }
}

const PRODUCTS = [
    {category: 'RTV', price: '1500 zł', stocked: true, name: 'Telewizor 43 cale'},
    {category: 'RTV', price: '1800 zł', stocked: true, name: 'Zestaw kina domowego'},
    {category: 'RTV', price: '350 zł', stocked: false, name: 'Radioodtwarzacz'},
    {category: 'AGD', price: '50 zł', stocked: true, name: 'Suszarka do włosów'},
    {category: 'AGD', price: '350 zł', stocked: false, name: 'Odkurzacz'},
    {category: 'AGD', price: '70 zł', stocked: true, name: 'Waga łazienkowa'},
    ];

ReactDOM.render(
    <FilterableProductTable products={PRODUCTS}/>,
    document.getElementById('container')
);