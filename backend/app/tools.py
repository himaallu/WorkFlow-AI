import pandas as pd
import os
from typing import List, Dict, Any, Optional

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")

def get_vendors_df() -> pd.DataFrame:
    return pd.read_csv(os.path.join(DATA_DIR, "vendors.csv"))

def search_vendors(category: Optional[str] = None, max_unit_price: Optional[float] = None, location: Optional[str] = None) -> List[Dict[str, Any]]:
    """
    Search vendors based on criteria.
    """
    df = get_vendors_df()
    
    if category:
        df = df[df['category'].str.lower() == category.lower()]
    if max_unit_price is not None:
        df = df[df['unit_price'] <= max_unit_price]
    if location:
        df = df[df['location'].str.lower() == location.lower()]
        
    return df.to_dict(orient="records")

def retrieve_policy() -> str:
    """Retrieve the procurement policy text."""
    with open(os.path.join(DATA_DIR, "procurement_policy.txt"), "r") as f:
        return f.read()

def calculate_budget(unit_price: float, quantity: int) -> float:
    """Calculate total budget for a line item."""
    return unit_price * quantity

def check_policy_compliance(total_cost: float) -> Dict[str, Any]:
    """Check if the purchase complies with general policy rules."""
    quotations_required = total_cost > 10000
    return {
        "compliant": True,
        "quotations_required": 3 if quotations_required else 1,
        "notes": "Requires 3 vendor quotations." if quotations_required else "1 quotation is sufficient."
    }

def determine_approval(total_cost: float) -> List[str]:
    """Determine the required approval workflow based on total cost."""
    if total_cost < 5000:
        return ["Manager"]
    elif 5000 <= total_cost <= 25000:
        return ["Department Head"]
    elif 25000 < total_cost <= 100000:
        return ["Department Head", "Finance"]
    else:
        return ["Department Head", "Finance", "Procurement"]
