# Generate a synthetic 3-year, 1,000-transaction dataset per the user's specs
import json, random, uuid
from datetime import datetime, timedelta
from decimal import Decimal, ROUND_HALF_UP
import pandas as pd

random.seed(42)

# Date range: last 3 years ending near Oct 25, 2025
end_date = datetime(2025, 10, 25, 23, 59, 59)
start_date = end_date - timedelta(days=365*3)

# Helper to format money with cents realistically
def money(min_val, max_val):
    # Use Decimal for cents and realistic fractional amounts
    cents = Decimal(random.uniform(min_val, max_val)).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
    # Add variability like .09, .49, .79, .99 sometimes
    tweak_options = [Decimal("0.00"), Decimal("0.09"), Decimal("0.29"), Decimal("0.39"), Decimal("0.49"),
                     Decimal("0.59"), Decimal("0.69"), Decimal("0.79"), Decimal("0.89"), Decimal("0.99")]
    if random.random() < 0.6:
        cents = (Decimal(int(cents)) + random.choice(tweak_options)).quantize(Decimal("0.01"))
    return float(cents)

# Accounts (kept consistent across the dataset)
checking_accounts = [
    "Chase Total Checking ****1234",
    "Wells Fargo Everyday Checking ****9876",
    "Bank of America Advantage Plus ****4421",
]

savings_accounts = [
    "Ally Online Savings ****7788",
    "Marcus by Goldman Sachs Savings ****3355"
]

credit_cards = [
    "Chase Freedom Unlimited ****1111",
    "Chase Sapphire Preferred ****2222",
    "American Express Gold ****3333",
    "Amex Blue Cash Everyday ****4444",
    "Citi Double Cash ****5555",
    "Capital One SavorOne ****6666",
    "Discover it Cash Back ****7777",
]

investment_accounts = [
    "Fidelity Brokerage ****8888",
    "Robinhood Brokerage ****9999",
    "Vanguard Brokerage ****0007",
]

payroll_employers = ["TechCorp Inc."]
freelance_clients = ["Design Studio LLC", "Acme Web Labs", "Northstar Analytics", "PixelForge Media"]

grocers = ["Whole Foods Market", "Trader Joe's", "Walmart Supercenter", "Kroger"]
dining = ["Chipotle", "McDonald's", "Panera Bread", "Local Café", "Five Guys", "Shake Shack", "Subway", "Panda Express"]
snacks = ["7-Eleven", "CVS", "Walgreens", "Bodega Corner"]
gas_vendors = ["Shell", "Chevron", "BP", "Exxon", "Mobil"]
transport = ["Uber", "Lyft", "MTA", "Amtrak", "Greyhound"]
utilities = [
    ("Con Edison", "Electricity"),
    ("National Grid", "Gas Utility"),
    ("Spectrum", "Internet"),
    ("Verizon Wireless", "Mobile Phone"),
    ("NYC Water", "Water/Sewer")
]
subscriptions = [
    ("Netflix", "Entertainment"),
    ("Spotify", "Entertainment"),
    ("YouTube Premium", "Entertainment"),
    ("Amazon Prime", "Shopping"),
    ("Apple iCloud", "Cloud Storage"),
    ("Adobe Creative Cloud", "Software"),
    ("GitHub", "Software"),
    ("Notion", "Software")
]

retail = ["Target", "Best Buy", "Home Depot", "IKEA", "Apple Store", "Micro Center", "Amazon Marketplace"]
health = ["CVS Pharmacy", "Walgreens Pharmacy", "Rite Aid", "Doctor Copay", "Dentist Office"]
travel = ["Delta Air Lines", "United Airlines", "Southwest Airlines", "JetBlue", "Airbnb", "Hilton", "Marriott", "Booking.com"]
entertainment = ["AMC Theatres", "Regal Cinemas", "Bowlero", "Topgolf", "Museum of Modern Art", "Concert Ticket"]

landlords = ["Sunset Apartments", "Riverview Lofts", "Maple Grove Residences"]

# Stock symbols / vendors for investments
dividend_stocks = ["Apple Inc.", "Microsoft Corp.", "Coca-Cola Co.", "AT&T Inc.", "Exxon Mobil Corp."]
tech_stocks = ["Tesla Inc.", "NVIDIA Corp.", "Amazon.com Inc.", "Meta Platforms Inc.", "Alphabet Inc."]

categories = {
    "Income": "Income",
    "Transfer": "Transfer",
    "Investment": "Investment",
    "Housing": "Housing",
    "Utilities": "Utilities",
    "Internet": "Utilities",
    "Mobile": "Utilities",
    "Food": "Food",
    "Groceries": "Food",
    "Dining": "Food",
    "Snacks": "Food",
    "Transportation": "Transportation",
    "Gas": "Transportation",
    "Health": "Health",
    "Shopping": "Shopping",
    "Entertainment": "Entertainment",
    "Travel": "Travel",
    "Interest": "Interest",
    "Fees": "Fees",
    "Education": "Education",
    "Credit Card Payment": "Transfer"
}

def random_timestamp():
    delta_seconds = int((end_date - start_date).total_seconds())
    t = start_date + timedelta(seconds=random.randint(0, delta_seconds))
    # Spread times more realistically: daytime bias
    hour = random.choices(
        population=[7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
        weights=[3,5,7,6,6,5,5,5,5,5,5,6,5,4,3,2]
    )[0]
    minute = random.randint(0,59)
    second = random.randint(0,59)
    return t.replace(hour=hour, minute=minute, second=second)

def pick(seq):
    return random.choice(seq)

def make_id(n):
    return n  # sequential integer IDs

transactions = []

tx_id = 1

# Generate monthly rent payments (36 months)
for m in range(36):
    d = start_date + timedelta(days=30*m + 3)  # approx monthly on the 4th
    landlord = pick(landlords)
    account = pick(checking_accounts)
    amt = money(1650, 2350)  # rent with cents
    transactions.append({
        "id": make_id(tx_id), "type": "out", "amount": amt, "currency": "USD",
        "account": account, "description": "Rent Payment", "vendor": landlord,
        "timestamp": d.replace(hour=8, minute=0, second=0).isoformat(),
        "category": "Housing"
    })
    tx_id += 1

# Generate biweekly salary deposits (~3 years -> ~78 paychecks)
pay_dates = []
t = start_date
while t < end_date:
    pay_dates.append(t)
    t += timedelta(days=14)

for d in pay_dates:
    account = "Chase Total Checking ****1234"  # primary payroll account
    gross = money(2250, 2950)
    transactions.append({
        "id": make_id(tx_id), "type": "in", "amount": gross, "currency": "USD",
        "account": account, "description": "Salary Deposit",
        "vendor": pick(payroll_employers), "timestamp": d.replace(hour=9, minute=0, second=0).isoformat(),
        "category": "Income"
    })
    tx_id += 1

# Savings interest monthly
for m in range(36):
    d = start_date + timedelta(days=30*m + 1)
    interest = money(1.10, 9.75)
    transactions.append({
        "id": make_id(tx_id), "type": "in", "amount": interest, "currency": "USD",
        "account": "Ally Online Savings ****7788",
        "description": "Interest Earned",
        "vendor": "Ally Bank", "timestamp": d.replace(hour=16, minute=30, second=0).isoformat(),
        "category": "Interest"
    })
    tx_id += 1

# Regular subscriptions monthly x several
def add_monthlies(service, vendor, category_key, account, months=36, day_offset=5):
    global tx_id
    for m in range(months):
        d = start_date + timedelta(days=30*m + day_offset)
        amt_map = {
            "Netflix": (12.99, 23.99),
            "Spotify": (9.99, 10.99),
            "YouTube Premium": (11.99, 18.99),
            "Amazon Prime": (12.99, 15.99),
            "Apple iCloud": (0.99, 9.99),
            "Adobe Creative Cloud": (19.99, 54.99),
            "GitHub": (4.00, 12.00),
            "Notion": (0.00, 15.00)
        }
        lo, hi = amt_map.get(service, (4.99, 19.99))
        amt = money(lo, hi)
        transactions.append({
            "id": make_id(tx_id), "type": "out", "amount": amt, "currency": "USD",
            "account": account, "description": f"{service} Subscription",
            "vendor": vendor, "timestamp": d.replace(hour=0, minute=0, second=0).isoformat(),
            "category": "Entertainment" if category_key == "Entertainment" else "Software" if category_key == "Software" else "Utilities"
        })
        tx_id += 1

# Put most subscriptions on a couple of credit cards
add_monthlies("Netflix", "Netflix", "Entertainment", "Chase Sapphire Preferred ****2222", day_offset=6)
add_monthlies("Spotify", "Spotify", "Entertainment", "Chase Freedom Unlimited ****1111", day_offset=7)
add_monthlies("YouTube Premium", "YouTube Premium", "Entertainment", "Citi Double Cash ****5555", day_offset=8)
add_monthlies("Amazon Prime", "Amazon Prime", "Shopping", "Discover it Cash Back ****7777", day_offset=9)
add_monthlies("Apple iCloud", "Apple iCloud", "Utilities", "Amex Blue Cash Everyday ****4444", day_offset=10)
add_monthlies("Adobe Creative Cloud", "Adobe Creative Cloud", "Software", "American Express Gold ****3333", day_offset=11)
add_monthlies("GitHub", "GitHub", "Software", "Capital One SavorOne ****6666", day_offset=12)
add_monthlies("Notion", "Notion", "Software", "Citi Double Cash ****5555", day_offset=13)

# Utilities monthly
for m in range(36):
    base_date = start_date + timedelta(days=30*m + 15)
    for vendor, util_name in utilities:
        amt_range = (45, 180) if util_name in ["Electricity", "Gas Utility", "Internet", "Mobile Phone"] else (25, 90)
        transactions.append({
            "id": make_id(tx_id), "type": "out", "amount": money(*amt_range), "currency": "USD",
            "account": pick(checking_accounts),
            "description": f"{util_name} Bill",
            "vendor": vendor, "timestamp": base_date.replace(hour=10, minute=0, second=0).isoformat(),
            "category": "Utilities"
        })
        tx_id += 1

# Groceries weekly-ish
current = start_date
while current < end_date and tx_id <= 1000:
    if random.random() < 0.7:
        transactions.append({
            "id": make_id(tx_id), "type": "out", "amount": money(35, 160), "currency": "USD",
            "account": pick(credit_cards),
            "description": "Grocery Shopping",
            "vendor": pick(grocers), "timestamp": current.replace(hour=18, minute=random.randint(0,59), second=0).isoformat(),
            "category": "Groceries"
        })
        tx_id += 1
    current += timedelta(days=random.randint(4,8))

# Dining & snacks sprinkled
for _ in range(220):
    d = random_timestamp()
    vendor = pick(dining)
    transactions.append({
        "id": make_id(tx_id), "type": "out", "amount": money(8, 34), "currency": "USD",
        "account": pick(credit_cards),
        "description": "Dining Out",
        "vendor": vendor, "timestamp": d.isoformat(),
        "category": "Dining"
    })
    tx_id += 1

for _ in range(120):
    d = random_timestamp()
    vendor = pick(snacks)
    transactions.append({
        "id": make_id(tx_id), "type": "out", "amount": money(2, 12), "currency": "USD",
        "account": pick(credit_cards),
        "description": "Snacks & Drinks",
        "vendor": vendor, "timestamp": d.isoformat(),
        "category": "Snacks"
    })
    tx_id += 1

# Gas / transportation
for _ in range(140):
    d = random_timestamp()
    if random.random() < 0.6:
        vendor = pick(gas_vendors)
        amt = money(25, 85)
        cat = "Gas"
        desc = "Fuel Purchase"
    else:
        vendor = pick(transport)
        amt = money(9, 45)
        cat = "Transportation"
        desc = "Ride/Transit"
    transactions.append({
        "id": make_id(tx_id), "type": "out", "amount": amt, "currency": "USD",
        "account": pick(credit_cards),
        "description": desc, "vendor": vendor, "timestamp": d.isoformat(),
        "category": cat
    })
    tx_id += 1

# Retail shopping
for _ in range(110):
    d = random_timestamp()
    transactions.append({
        "id": make_id(tx_id), "type": "out", "amount": money(15, 320), "currency": "USD",
        "account": pick(credit_cards),
        "description": "Retail Purchase",
        "vendor": pick(retail), "timestamp": d.isoformat(),
        "category": "Shopping"
    })
    tx_id += 1

# Health expenses
for _ in range(40):
    d = random_timestamp()
    transactions.append({
        "id": make_id(tx_id), "type": "out", "amount": money(10, 250), "currency": "USD",
        "account": pick(checking_accounts),
        "description": "Health Expense",
        "vendor": pick(health), "timestamp": d.isoformat(),
        "category": "Health"
    })
    tx_id += 1

# Travel
for _ in range(30):
    d = random_timestamp()
    vendor = pick(travel)
    amt = money(80, 750)
    transactions.append({
        "id": make_id(tx_id), "type": "out", "amount": amt, "currency": "USD",
        "account": pick(credit_cards),
        "description": "Travel Expense",
        "vendor": vendor, "timestamp": d.isoformat(),
        "category": "Travel"
    })
    tx_id += 1

# Entertainment / events
for _ in range(35):
    d = random_timestamp()
    vendor = pick(entertainment)
    transactions.append({
        "id": make_id(tx_id), "type": "out", "amount": money(12, 120), "currency": "USD",
        "account": pick(credit_cards),
        "description": "Leisure & Entertainment",
        "vendor": vendor, "timestamp": d.isoformat(),
        "category": "Entertainment"
    })
    tx_id += 1

# Investment activity: buys/sells/dividends
for _ in range(70):
    d = random_timestamp()
    acct = pick(investment_accounts)
    if random.random() < 0.5:
        sym = pick(tech_stocks)
        amt = money(100, 1200)
        desc = "Stock Purchase"
        ttype = "out"
        vendor = sym
    else:
        if random.random() < 0.5:
            sym = pick(tech_stocks)
            amt = money(120, 1400)
            desc = "Stock Sale"
            ttype = "in"
            vendor = sym
        else:
            sym = pick(dividend_stocks)
            amt = money(2, 45)
            desc = "Dividend Payment"
            ttype = "in"
            vendor = sym
    transactions.append({
        "id": make_id(tx_id), "type": ttype, "amount": amt, "currency": "USD",
        "account": acct, "description": desc, "vendor": vendor,
        "timestamp": d.isoformat(), "category": "Investment"
    })
    tx_id += 1

# Freelance sporadic income
for _ in range(35):
    d = random_timestamp()
    transactions.append({
        "id": make_id(tx_id), "type": "in", "amount": money(75, 950), "currency": "USD",
        "account": pick(checking_accounts),
        "description": "Freelance Payment",
        "vendor": pick(freelance_clients), "timestamp": d.isoformat(),
        "category": "Income"
    })
    tx_id += 1

# Internal transfers between checking/savings, and credit card payments
for _ in range(90):
    d = random_timestamp()
    if random.random() < 0.6:
        # Transfer between checking and savings
        from_acct = pick(checking_accounts + savings_accounts)
        to_acct = pick([a for a in (checking_accounts + savings_accounts) if a != from_acct])
        amt = money(50, 1200)
        # Out from source
        transactions.append({
            "id": make_id(tx_id), "type": "out", "amount": amt, "currency": "USD",
            "account": from_acct, "description": "Internal Transfer Out",
            "vendor": to_acct, "timestamp": d.isoformat(), "category": "Transfer"
        })
        tx_id += 1
        # In to destination
        transactions.append({
            "id": make_id(tx_id), "type": "in", "amount": amt, "currency": "USD",
            "account": to_acct, "description": "Internal Transfer In",
            "vendor": from_acct, "timestamp": (d + timedelta(minutes=1)).isoformat(), "category": "Transfer"
        })
        tx_id += 1
    else:
        # Credit card payment from checking
        card = pick(credit_cards)
        from_chk = pick(checking_accounts)
        amt = money(35, 1500)
        # Out from checking (payment)
        transactions.append({
            "id": make_id(tx_id), "type": "out", "amount": amt, "currency": "USD",
            "account": from_chk, "description": f"Payment to {card.split(' •')[0]}",
            "vendor": card, "timestamp": d.isoformat(), "category": "Credit Card Payment"
        })
        tx_id += 1
        # In to credit card (credit)
        transactions.append({
            "id": make_id(tx_id), "type": "in", "amount": amt, "currency": "USD",
            "account": card, "description": "Payment Received",
            "vendor": from_chk, "timestamp": (d + timedelta(minutes=1)).isoformat(), "category": "Transfer"
        })
        tx_id += 1

# Occasional refunds / chargebacks / ATM withdrawals / fees
for _ in range(40):
    d = random_timestamp()
    kind = random.choice(["Refund", "Chargeback", "ATM", "Fee"])
    if kind == "Refund":
        transactions.append({
            "id": make_id(tx_id), "type": "in", "amount": money(5, 150), "currency": "USD",
            "account": pick(credit_cards),
            "description": "Merchant Refund",
            "vendor": pick(retail + dining + snacks), "timestamp": d.isoformat(), "category": "Shopping"
        })
    elif kind == "Chargeback":
        transactions.append({
            "id": make_id(tx_id), "type": "in", "amount": money(15, 300), "currency": "USD",
            "account": pick(credit_cards),
            "description": "Chargeback Credit",
            "vendor": pick(retail), "timestamp": d.isoformat(), "category": "Shopping"
        })
    elif kind == "ATM":
        amt = money(20, 200)
        acct = pick(checking_accounts)
        transactions.append({
            "id": make_id(tx_id), "type": "out", "amount": amt, "currency": "USD",
            "account": acct,
            "description": "ATM Cash Withdrawal",
            "vendor": f"ATM - {pick(['Chase', 'Wells Fargo', 'Bank of America', 'Allpoint'])}",
            "timestamp": d.isoformat(), "category": "Cash"
        })
    else:  # Fee
        acct = pick(checking_accounts + credit_cards + savings_accounts)
        transactions.append({
            "id": make_id(tx_id), "type": "out", "amount": money(1, 35), "currency": "USD",
            "account": acct, "description": "Service Fee",
            "vendor": "Account Fee", "timestamp": d.isoformat(), "category": "Fees"
        })
    tx_id += 1

# Ensure exactly 1000 transactions by trimming or adding small dining entries
transactions.sort(key=lambda x: x["timestamp"])
if len(transactions) > 1000:
    transactions = transactions[:1000]
elif len(transactions) < 1000:
    while len(transactions) < 1000:
        d = random_timestamp()
        transactions.append({
            "id": len(transactions)+1, "type": "out", "amount": money(6, 18), "currency": "USD",
            "account": pick(credit_cards), "description": "Coffee & Pastry",
            "vendor": pick(["Starbucks", "Dunkin'", "Local Café"]), "timestamp": d.isoformat(),
            "category": "Snacks"
        })

# Reassign IDs to be sequential after sort/trim
for i, tx in enumerate(transactions, start=1):
    tx["id"] = i

# Save to JSON and CSV
json_path = "./data/activity.json"
# csv_path = "/mnt/data/transactions_3y_usd_1000.csv"

with open(json_path, "w") as f:
    json.dump(transactions, f, indent=2)

# df = pd.DataFrame(transactions)
# df.to_csv(csv_path, index=False)

# Show a preview to the user (first 25 rows)
# display_dataframe_to_user("3-Year Synthetic Transactions (Preview)", df.head(25))

# json_path, csv_path, len(transactions)
