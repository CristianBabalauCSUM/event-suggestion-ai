import numpy as np
import pandas as pd

hardcoded_task = [24.03, 29.04, 30.45, 23.66, 31.88, 24.26, 54.75, 38.712, 53, 38.84, 54.58, 60]
ai_integration = [10, 3, 5, 7, 12, 3, 10, 5, 5, 1, 9, 8]

from scipy import stats

t_stat, p_val = stats.ttest_ind(hardcoded_task, ai_integration)

print(f"t-statistic: {t_stat}")
print(f"p-value: {p_val}")