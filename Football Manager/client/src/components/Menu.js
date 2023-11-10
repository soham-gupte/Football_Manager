const team_name = "Soham";

export function Menu() {
    return (
        <div className="main-menu">
            <div className='main-menu-contents'>
                <h1>{team_name}</h1>
                <a href='/marketplace'><button>Marketplace</button></a>
                <a href='/trading'><button>Trading</button></a>
                <a href='/notifications'><button>Notifications</button></a>
                <a href='/transactions'><button>Transactions</button></a>
            </div>
        </div>
    )
}