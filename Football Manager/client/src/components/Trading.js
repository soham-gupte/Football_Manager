import { Menu } from "./Menu"

export function Trading() {

    return (
        <div className="trading">
            <Menu />
            <div className="trading-content">
                <h1>Trading App</h1>
                <label>
                    Enter username to trade with:
                    <input type="text"/>
                </label>
                <button>Check User</button>
            </div>
        </div>
    )
}