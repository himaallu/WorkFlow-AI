import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.tools import calculate_budget, determine_approval, check_policy_compliance, search_vendors

def test_calculate_budget():
    assert calculate_budget(100.0, 5) == 500.0
    assert calculate_budget(0.0, 10) == 0.0

def test_determine_approval():
    assert determine_approval(4000) == ["Manager"]
    assert determine_approval(5000) == ["Department Head"]
    assert determine_approval(20000) == ["Department Head"]
    assert determine_approval(25000) == ["Department Head", "Finance"]
    assert determine_approval(100000) == ["Department Head", "Finance"]
    assert determine_approval(150000) == ["Department Head", "Finance", "Procurement"]

def test_check_policy_compliance():
    res = check_policy_compliance(5000)
    assert res["quotations_required"] == 1
    
    res = check_policy_compliance(15000)
    assert res["quotations_required"] == 3

def test_search_vendors():
    vendors = search_vendors(category="laptops")
    assert len(vendors) > 0
    assert all(v['category'].lower() == 'laptops' for v in vendors)
    
    vendors_cheap = search_vendors(category="laptops", max_unit_price=2500)
    assert all(v['unit_price'] <= 2500 for v in vendors_cheap)
