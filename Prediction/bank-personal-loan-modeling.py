#!/usr/bin/env python
# coding: utf-8

# <p><center style="font-family:cursive; color:orange;font-size:120%;">In the name of God</center></p>
# 
# # <p><center style="font-family:newtimeroman;font-size:180%;">💸Bank Personal Loan Modeling💸</center></p>
# 
# <p><center style="color:#159364; font-family:cursive;font-size:100%;">Thanks for visiting my notebook </center></p>
# 
# ***
# <br>
# <center><img src='https://miro.medium.com/max/1012/1*tF1iKXHs9qypE_E2fQqytQ.png' height=300px width=750px></center><br>
# 
# <div class="alert alert-block alert-info" style="font-size:14px; font-family:verdana;">
#     📌 Feel free to fork or edit the notebook for your own convenience. If you liked the notebook, consider upvoting. It helps other people discover the notebook as well. Your support inspires me to produce more of these kernel.😊
# </div>
# 
# ## <p style="font-family:newtimeroman;font-size:80%;">🤔 Data Set Problems</p>
# This case is about a bank (Thera Bank) whose management wants to explore ways of converting its liability customers to personal loan customers (while retaining them as depositors). A campaign that the bank ran last year for liability customers showed a healthy conversion rate of over 9% success. This has encouraged the retail marketing department to devise campaigns with better target marketing to increase the success ratio with minimal budget.
# <br><br>
# 
# ## <p style="font-family:newtimeroman;font-size:80%;">🎯 Objectives of Notbook</p>
# **This notebook aims to:**
# *   Cleaning Dataset
# *   Dataset exploration using various types of data visualization.
# *   Identifying suitable patterns for modeling (Pattern Recognition)
# *   Build various ML models that can predict personal loan customers.
# <br><br>
# 
# 👨‍💻 **The machine learning models used in this project are:** 
# 1. Multinomial Naive Bayes
# 2. Categorical Naive Bayes
# 3. Bernoulli Naive Bayes
# 4. Complement Naive Bayes
# 5. Logistic Regression
# 6. KNN
# 7. Decision Tree
# 8. Random Forest
# 
# **Like this notebook? You can support me by giving upvote** 😆👍🔼 <br>
# 
# ---

# <a id="tabel"></a>
# <b>Table of contents:</b>
# 
# * [1. About Dataset](#about)
# * [2. Import Libraries & Dataset](#import)
# * [3. Overview of Dataset](#overview)
# * [4. Cleaning Dataset](#clean)
# * [5. Exploratory Data Analysis (EDA)](#eda)
#     - [5.1. Univariate Analysis](#univariate)
#     - [5.2. Bivariate Analysis](#bivariate)
#     - [5.3. Multivariate Analysis](#multivariate)
# * [6. Models and Improve Models](#model)
#     - [6.1. MultinomialNB( )](#multinomial)
#     - [6.2. CategoricalNB( )](#categorical)
#     - [6.3. ComplementNB( )](#complement)
#     - [6.4. BernoulliNB( )](#bernoulli)
#     - [6.5. LogisitcRegression( )](#logistic)
#     - [6.6. KNN: KNeighborsClassifier( )](#knn)
#     - [6.7. Decision tree](#dt)
#     - [6.8. Random Forest](#rf)
# * [7. Comparing Models](#compare)
# * [8. Visualization Final Model](#visualize)
# * [9. Prediction Sample Data](#predict)
# 
# Happy learning 🐱‍🏍 

# <a id="about"></a>
# # <p style="background-color:#145A32;font-family:newtimeroman;font-size:120%;color:orange;text-align:center;border-radius:15px 50px; padding:7px">1. About Dataset</p>
# 
# [🏠 Tabel of Contents](#tabel)
# 
# The file bank_personal_loan.csv contains data on 5000 customers. The data include customer demographic information (age, income, etc.), the customer's relationship with the bank (mortgage, securities account, etc.), and the customer response to the last personal loan campaign (Personal Loan). Among these 5000 customers, only 480 (= 9.6%) accepted the personal loan that was offered to them in the earlier campaign.
# 
# There are no empty or (NaN) values in the dataset. The dataset has a mix of numerical and categorical attributes, but all categorical data are represented with numbers. Moreover, Some of the predictor variables are heavily skewed (long - tailed), making the data pre-processing an interesting yet not too challenging aspect of the data.
# 
# The following is the **structure of the data set**:
# 
# 
# <table style="width:100%">
# <thead>
# <tr>
# <th style="text-align:center; font-weight: bold; font-size:20px">Variable Name</th>
# <th style="text-align:center; font-weight: bold; font-size:20px">Description</th>
# <th style="text-align:center; font-weight: bold; font-size:20px">Sample Data</th>
# </tr>
# </thead>
# <tbody>
# <tr>
# <td><b>ID</b></td>
# <td>Customer ID</td>
# <td>1, 2, ...</td>
# </tr>
# <tr>
# <td><b>Age</b></td>
# <td>Customer's age in completed years</td>
# <td>25, 45, ...</td>
# </tr>
# <tr>
# <td><b>Experience</b></td>
# <td><br>Years of professional experience</td>
# <td>1, 19, ...</td>
# </tr>
# <tr>
# <td><b>Income</b></td>
# <td>Annual income of the customer (1000 Dollar)</td>
# <td>49, 34, ...</td>
# </tr>
# <tr>
# <td><b>Zip Code</b></td>
# <td>Home Address ZIP code</td>
# <td>91107, 90089, ...</td>
# </tr>
# <tr>
# <td><b>Family</b></td>
# <td>Family size of the customer<br> (1, 2, 3, 4)</td>
# <td>4, 3, ...</td>
# </tr>
# <tr>
# <td><b>CCAvg</b></td>
# <td>Avg. spending on credit cards per month (1000 Dollar)</td>
# <td>1/60, 1/50, ...</td>
# </tr>
# <tr>
# <td><b>Education</b></td>
# <td>Education Level<br>(1: Undergrad; 2: Graduate; 3: Advanced/Professional)</td>
# <td>1, 2, ...</td>
# </tr>
# <tr>
# <td><b>Mortgage</b></td>
# <td>Value of house mortgage if any. ($1000)</td>
# <td>0, 101, ...</td>
# </tr>
# <tr>
# <td><b>Personal Loan</b></td>
# <td>Did this customer accept the personal loan offered in the last campaign?<br>(0, 1)</td>
# <td>0, 1</td>
# </tr>
# <tr>
# <td><b>Securityaccount</b></td>
# <td>Does the customer have a securities account with this bank?<br>(0, 1)</td>
# <td>0, 1</td>
# </tr>
# <tr>
# <td><b>Cd_account</b></td>
# <td>Does the customer have a certificate of deposit (CD) account with this bank?<br>(0, 1)</td>
# <td>0, 1</td>
# </tr>
# <tr>
# <td><b>Online</b></td>
# <td>Does the customer use internet banking facilities?<br>(0, 1)</td>
# <td>0, 1</td>
# </tr>
# <tr>
# <td><b>CreditCard</b></td>
# <td>Does the customer use a credit card issued by Universal Bank?<br>(0, 1)</td>
# <td>0, 1</td>
# </tr>
# </tbody>
# </table>

# <a id="import"></a>
# # <p style="background-color:#145A32;font-family:newtimeroman;font-size:120%;color:orange;text-align:center;border-radius:15px 50px; padding:7px">2. Import Libraries & Dataset</p>
# 
# [🏠 Tabel of Contents](#tabel)

# In[1]:


# import required libraries
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import itertools
import plotly.express as px
import plotly.graph_objects as go
import plotly.io as pio
from plotly.subplots import make_subplots

pio.renderers.default = 'browser'


# Optional
# for filter warnings
import warnings
warnings.filterwarnings('ignore')

# for better plot visualization 
# plt.style.use('seaborn')  # Replace 'seaborn' with the style you want to use
FONT = {'fontsize': 20, 'fontstyle': 'normal', 'fontfamily': 'Times New Roman', 'backgroundcolor': '#145A32', 'color': 'orange'}  # for plot title


# In[2]:


# import requirement sklearn functions
from sklearn.preprocessing import StandardScaler, MinMaxScaler
from sklearn.pipeline import Pipeline
from sklearn.model_selection import KFold, cross_val_score, train_test_split, GridSearchCV, StratifiedKFold
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import MultinomialNB, ComplementNB, BernoulliNB, CategoricalNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn import tree
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import roc_curve, auc, accuracy_score, precision_score, recall_score, f1_score, confusion_matrix, classification_report, jaccard_score, log_loss


# In[3]:


# import bank_personal_loan dataset
data = pd.read_csv('bank_loan.csv')
df = pd.DataFrame(data)
df


# <a id="overview"></a>
# # <p style="background-color:#145A32;font-family:newtimeroman;font-size:120%;color:orange;text-align:center;border-radius:15px 50px; padding:7px">3. Overview of Dataset</p>
# 
# [🏠 Tabel of Contents](#tabel)

# In[4]:


df.head()


# In[5]:


df.info()


# 👉 According to above information:
#  - Dataset has 5000 datapoints.
#  - Dataset has 14 columns including:
#    - 13 columns by int64 type: `ID`, `Age`, `Experience`, `Income`, `ZIP Code`, `Family`, `Education`, `Moragage`, `Personal Loan`, `Securities Account`, `CD Account`, `Online` and `CreditCard`
#    - 1 column by object type: `CCAvg`
#  - Target is `Personal Loan` column and other columns are features.
#  - It seems that there is no missing value, but there may be invalid values, so we will check this case further.

# <a id="clean"></a>
# # <p style="background-color:#0c4510;font-family:newtimeroman;font-size:120%;color:orange;text-align:center;border-radius:15px 50px; padding:7px">4. Cleaning Dataset</p>
# 
# [🏠 Tabel of Contents](#tabel)

# It seems that the / sign in column CCAvg represents a decimal. Therefore, we first correct the CCAvg column by replace . instead of / and then convert type of CCAvg to float64:

# In[6]:


df['CCAvg'] = df['CCAvg'].str.replace('/', '.').astype('float64')
df


# In[7]:


df.dtypes


# In[8]:


pd.set_option('display.max_rows', 20) # for show all rows
round(df.describe().T, 2)


# It seems that we have a negative value in the Experience column, which is illogical, so since we do not have access to the owner of the data, we assume that the negative data was actually positive, so we convert the negative numbers into positive ones.

# In[9]:


# find negative values in Experience columns
df[df['Experience'] < 0]


# In[10]:


# convert above 52 rows to positive value
df[df['Experience'] < 0] = df[df['Experience'] < 0].abs()
df


# In[11]:


# check missing values
df.isna().sum().to_frame().T


# ✅ Nice. No missing values. Let's continuous to check invalid values

# In[12]:


# check invalid valuse
for col in df:
    print(f"{col} has {df[col].nunique()} unique value")


# In[13]:


# Check value counts of column that appear categorical accoring to above results
discrete_cols1 = ['Family', 'Education', 'Personal Loan', 'Securities Account', 'CD Account', 'Online', 'CreditCard']
for col in discrete_cols1:
    print(f"{col}:\n{df[col].value_counts()}")
    print('-' * 50)


# ✅ OK. According to above results and type of columnsو We conclude that there are no invalid values.

# In[14]:


# now check duplicated data
df.duplicated().sum()


# ✅ Well, there is no duplicate data
# 
# Now we remove columns that not require for create model i.e. `ID`, `ZIP Code`

# In[15]:


# drop ID and ZIP Code columns
df.drop(['ID', 'ZIP Code'], axis=1, inplace=True)
df


# now check outliers and noisy data. For this step we use scatter plot and box plot

# In[16]:


# check noisy data
plt.show()
sns.set_palette('summer')
dnp = sns.pairplot(df.loc[:, ~df.columns.isin(discrete_cols1)])
dnp.fig.suptitle('Detect Noisy Data', y=1.02, **FONT)

plt.show()


# <div class="alert alert-block alert-info" style="font-size:14px; font-family:verdana;">
#     📌 In the box plot below, you can select the columns you want, from the right side of the chart to display.😊
# </div>

# In[17]:


fig = go.Figure()
for col in df:
    fig.add_trace(go.Box(x=df[col], name=col))
fig.update_layout(
    title_text="Box Plot Styling Outliers",
    title_font=dict(color='orange', family='newtimeroman', size=25),
    title_x=0.45,
    paper_bgcolor='#145A32',
    # plot_bgcolor='#DAF7A6',
    font=dict(color='#DAF7A6', family='newtimeroman', size=16),
    )
fig.show()


# An outlier is an observation that is unlike the other observations and we see some of these in above boxplot for some comlumns but <font color='red'>outliers are innocent until proven guilty</font>. With that being said, they should not be removed unless there is a good reason for that. According to pairplot, noisy data does not appear to exist. Therefore, we do not delete any data.
# 
# Now everything is ok. There is only one small point that needs to be fixed. As it was said in section 1, the Income column expresses the annual income, while the CCAvg column expresses the Avg. spending on credit cards per month, so to standardize the units of the columns, we convert the annual income to monthly.

# In[18]:


# convert annual income to monthly with divide by 12
df['Income'] = round(df['Income']/12, 2)
df


# <a id="eda"></a>
# # <p style="background-color:#0c4510;font-family:newtimeroman;font-size:120%;color:orange;text-align:center;border-radius:15px 50px; padding:7px">5. Exploratory Data Analysis (EDA)</p>
# 
# [🏠 Tabel of Contents](#tabel)
# 
# Before univariate analysis we check distribution of each columns:

# In[19]:


# check distribution Scatter matrix (splom) with go.Splom
sns.set_palette('summer')
fig, ax = plt.subplots(4,3,figsize=(12,20))
for i, col in enumerate(df):
    sns.histplot(df[col], kde=True, ax=ax[i//3, i%3])
fig.suptitle('Distribution of Columns', y=1.02, **FONT)
plt.show()


# <a id="univariate"></a>
# # <p style="background-color:#0c4510;font-family:newtimeroman;font-size:100%;color:orange;text-align:center;border-radius:15px 50px; padding:7px">5.1. Univariate Analysis</p>
# 
# [🏠 Tabel of Contents](#tabel)

# In[20]:


# import required libraries
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import itertools
import plotly.express as px
import plotly.graph_objects as go
import plotly.io as pio
from plotly.subplots import make_subplots

pio.renderers.default = 'browser'


# Optional
# for filter warnings
import warnings
warnings.filterwarnings('ignore')

# for better plot visualization 
#plt.style.use('seaborn')  # Replace 'seaborn' with the style you want to use
FONT = {'fontsize': 20, 'fontstyle': 'normal', 'fontfamily': 'Times New Roman', 'backgroundcolor': '#145A32', 'color': 'orange'}  # for plot title

# Your data preparation and other code here
# Assuming you have a DataFrame named df

# Define categorical columns
cat_cols = df.select_dtypes(include=['object']).columns.tolist()

# Loop through categorical columns
for col in cat_cols:
    # count of col (bar chart)
    fig, axes = plt.subplots(nrows=1, ncols=2, figsize=(15, 6))
    
    sns.countplot(data=df, x=col, ax=axes[0])
    for p in axes[0].patches:
        axes[0].annotate(f'{p.get_height()}', (p.get_x() + p.get_width() / 2., p.get_height()),
                         ha='center', va='center', xytext=(0, 10), textcoords='offset points')

    # count of col (pie chart)
    slices = df[col].value_counts().sort_index().values
    axes[1].pie(slices, labels=slices, autopct='%1.1f%%', startangle=90)
    axes[1].axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle.

    # Set titles
    axes[0].set_title(f'Count of {col}')
    axes[1].set_title(f'Distribution of {col}')

    plt.show()



# In[21]:


# univariate analysis of numerical data:
df.loc[:, ~df.columns.isin(discrete_cols1)].describe().T


# 👉 According to above plots and tabel:
#  - Customers with the number of Family 1 and the number of Family 3 respectively have the highest frequency and the lowest frequency, but in general, the customers with the number of Family 1, 2, 3, and 4 are almost equally distributed in the dataset (Fig 1).
#  - The customers who did not accept a Personal Loan are much more than the customers who accepted a Personal Loan, and therefore there is an imbalance in the classes, so we must be careful to consider the imbalance in the model section for resampling the data.
#  - Most of the bank's customers have education level 1 i.e. Undergrad (Fig 2).
#  - Most of the bank's customers (90.4%) did not accept the personal loan offer (Fig 3).
#  - Most of the bank's customers (89.6%) did not have a Securities Account (Fig 4).
#  - Most of the bank's customers (94%) did not have a CD Account (Fig 5).
#  - Most of the bank's customers (59.7%) used internet banking facilities (Fig 6).
#  - Most of the bank's customers (70.6%) did not use a credit card issued by Universal Bank(Fig 6).
#  - The Age range of customers is between 23 and 67 years. The average age of customers is almost 45.
#  - The Experience range of customers is between 0 and 43 years. The mean age of customers is almost 20.
#  - The age and experience columns have a similar distribution. Also, the column of income, mortgage and average distribution are almost similar, all of them are skewed to the right.
#  - The average income of the bank's customers per month is approximately 6 thousand dollars and its range is between 0.67 and 18.67 thousand dollars. CCAvg of the bank's customers per month is approximately 1.94 thousand dollars and its range is between 0 and 10 thousand dollars.
#  - The average Mortgage of the bank's customers is approximately 56 thousand dollars and its range is between 0 and 635 thousand dollars.

# <a id="bivariate"></a>
# # <p style="background-color:#0c4510;font-family:newtimeroman;font-size:100%;color:orange;text-align:center;border-radius:15px 50px; padding:7px">5.2. Bivariate Analysis</p>
# 
# [🏠 Tabel of Contents](#tabel)

# In[22]:


# check distribution of Income (based on Personal Loan)
plt.show()
#plt.style.use('seaborn-notebook')
sns.set_palette(['green','orange'])
for j, col in enumerate(['Income','Mortgage','CCAvg','Age']):
    for i, label in enumerate(df['Personal Loan'].unique().tolist()):
        sns.kdeplot(df.loc[df['Personal Loan'] == label, col], label=label, shade=True)
    plt.title(f'1. KDE of {col} based on Personal Loan (Fig {j+1})', fontdict=FONT, pad=15)
    plt.legend()
    plt.show()


# 👉 According to above plots:
#  - The Income of people who have accepted a bank loan is often higher than that of people who have not accepted a bank loan. Approximately, people whose monthly Income is more than 8 thousand dollars have accepted a bank loan (Fig 1)
#  - Most people who accepted a bank loan had mortgage euqal to zero (Fig 2).
#  - The CCAvg of people who have accepted a bank loan is often higher than that of people who have not accepted a bank loan. Approximately, people whose CCAvg is more than 3 thousand dollars have accepted a bank loan (Fig 3).
#  - It seems that age does not have much influence in determining whether or not to accept a bank loan (Fig 4)

# In[23]:


# count of purchased based on Gender
plt.show()
sns.set_palette(['#1f4a1b','orange','#bbff33','yellow'])
discrete_cols2 = ['Family', 'Education', 'Securities Account', 'CD Account', 'Online', 'CreditCard']
for i, col in enumerate(discrete_cols2):
    fig, ax = plt.subplots(figsize=(8, 6))
    sns.countplot(data=df, x='Personal Loan', hue=col, ax=ax)
    
    for p in ax.patches:
        height = p.get_height()
        ax.annotate(f'{height}', (p.get_x() + p.get_width() / 2., height),
                    ha='center', va='center', xytext=(0, 10), textcoords='offset points')
    
    plt.title(f'Count of Personal Loan based on {col} (Fig {i+5})', fontdict=FONT, pad=15)
    plt.show()


# 👉 According to above plots:
#  - Among the people who did not accept the personal loan, most of them had a family equal to 1, but among the people who accepted the personal loan, there is not much difference in terms of family (Fig 5).
#  - Among the people who did not accept the personal loan, most of them had an Education of 1, but among the people who accepted the personal loan, the Education was mostly 3 or 2 (Fig 6).
#  - Most of the people, both those who accepted the personal loan and those who did not, did not have a Securities Account (Fig 7).
#  - Most of the people, both those who accepted the personal loan and those who did not, did not have a CD Account (Fig 8).
#  - Most of the people, both those who accepted the personal loan and those who did not, used online banking facilities (Fig 9).
#  - Most of the people, both those who accepted the personal loan and those who did not, did not use a Creditcard (Fig 10).

# In[24]:


# Mean of Income and CCAvg based on each feature
for i, col in enumerate(['Income', 'CCAvg','Mortgage']):
    print('='*30, f"Mean of {col} in each categorical feature", '='*30)
    for j, cat in enumerate(discrete_cols2):
        fig , ax= plt.subplots(1,2, figsize=(10,4))
        
        # Barplot with mean
        gp = df.groupby([cat])[col].mean().to_frame().reset_index()
        sns.barplot(data=gp, x=cat, y=col, ax=ax[0])
        for p in ax[0].patches:
            height = p.get_height()
            ax[0].annotate(f'{height:.2f}', (p.get_x() + p.get_width() / 2., height),
                            ha='center', va='center', xytext=(0, 10), textcoords='offset points')
        ax[0].set_title(f'Mean of {col} (based on {cat})', y=1.09, **FONT)

        # Boxplot
        sns.boxplot(data=df, x=cat, y=col, ax=ax[1])
        ax[1].set_title(f'Boxplot of {cat} (Fig {i+11}-{j+1})', y=1.09, **FONT)

        plt.show()


# In[25]:


# draw heatplot of correlation between columns
plt.figure(figsize=(10,8))
sns.heatmap(round(df.corr(),2), cmap='Greens', annot=True)
plt.title('Heatmap of Correlations', y=1.02, fontdict=FONT)
plt.show()


# 👉 According to above plots:
#  - Customers whose Family was 2 had the highest average Income (7.02 thousand $, Fig 11-1).
#  - Unexpectedly, customers whose Education was 1 had the highest average Income (7.13 thousand $, Fig 11-2).
#  - The average income of customers whose Secutities Account and CreditCard and Online was 1 is the same as that of those was zero(6.1 thousand $, Fig 11-3,5,6).
#  - The average income of those who have a CD account is higher than that of customers who do not have a CD account (8.7 thousand $, Fig 11-4).
#  - Similar results can be obtained for the CCAvg and Mortgage average, which shows that the behavior of the CCAvg, Mortgage and Income columns is somewhat similar to each other (Fig 12-1 to 13-6).
#  - According to the heatmap, Personal Loan has the highest correlation with Income, CCAvg and CD Account respectively.
#  - Age and experience have a completely linear relationship with each other.

# <a id="multivariate"></a>
# # <p style="background-color:#0c4510;font-family:newtimeroman;font-size:100%;color:orange;text-align:center;border-radius:15px 50px; padding:7px">5.3. Multivariate Analysis</p>
# 
# [🏠 Tabel of Contents](#tabel)

# In[26]:


# draw pairplot with hue = Personal Loan
sns.set_palette(['#1f4a1b','orange','#bbff33','yellow'])
splot = sns.pairplot(data=df, x_vars=['Age','Experience','Income','CCAvg','Mortgage'], y_vars=['Age','Experience','Income','CCAvg','Mortgage'], hue='Personal Loan')
splot.fig.suptitle('Scatter plot of continuous feature (hue = Personal Loan)', y=1.05, **FONT)
plt.show()


# In[27]:


continuous_cols = ['Age','Experience','CCAvg','Mortgage']

for i, col in enumerate(continuous_cols):
    fig = px.scatter_3d(
        data_frame= df,
        x=df.Income,
        y=df[col],
        z=df['Personal Loan'],
        color=df['Personal Loan'].astype(str),
        color_discrete_map={'1':'orange', '0':'red'},
        template='ggplot2',
        hover_name='Age',
        # hover_data=
        opacity=0.6,
        # symbol='Transmission',
        # symbol_map=
        # log_x=True,
        # log_z=True,
        height=700,
        title=f'3D scatter of features based on Personal Loan (Fig {i+1})')

    fig.update_layout(
        title_text="Box Plot Styling Outliers",
        title_font=dict(color='orange', family='newtimeroman', size=25),
        title_x=0.45,
        paper_bgcolor='#145A32',
        # plot_bgcolor='#DAF7A6',
        font=dict(color='#DAF7A6', family='newtimeroman', size=16),
    )
    pio.show(fig)


# In[28]:


results = pd.pivot_table(data=df, index='CD Account', columns='Education', values='Personal Loan')
sns.heatmap(results, cmap='Greens', annot=True)
plt.show()


# 👉 According to above plots:
#  - Customers whose Income is less than `$5 thousand ` per month have not accepted a personal loan.
#  - Most customers whose income is less than `$10 thousand ` per month and their CCAvg is less than `$3 thousand ` per month have not accepted a personal loan.
#  - 62% of customers whose CD Account was 1 and Education was 2 have accepted a personal loan.

# In[29]:


fig, ax = plt.subplots(6,2,figsize=(14,24))
sns.stripplot(data=df, x='Education', y='Income', hue='Personal Loan', ax=ax[0,0])
sns.stripplot(data=df, x='Education', y='CCAvg', hue='Personal Loan', ax=ax[0,1])
sns.stripplot(data=df, x='Family', y='Income', hue='Personal Loan', ax=ax[1,0])
sns.stripplot(data=df, x='Family', y='CCAvg', hue='Personal Loan', ax=ax[1,1])
sns.stripplot(data=df, x='CD Account', y='Income', hue='Personal Loan', ax=ax[2,0])
sns.stripplot(data=df, x='CD Account', y='CCAvg', hue='Personal Loan', ax=ax[2,1])
sns.stripplot(data=df, x='Online', y='Income', hue='Personal Loan', ax=ax[3,0])
sns.stripplot(data=df, x='Online', y='CCAvg', hue='Personal Loan', ax=ax[3,1])
sns.stripplot(data=df, x='CreditCard', y='Income', hue='Personal Loan', ax=ax[4,0])
sns.stripplot(data=df, x='CreditCard', y='CCAvg', hue='Personal Loan', ax=ax[4,1])
sns.stripplot(data=df, x='Securities Account', y='Income', hue='Personal Loan', ax=ax[5,0])
sns.stripplot(data=df, x='Securities Account', y='CCAvg', hue='Personal Loan', ax=ax[5,1])
ax[0,0].set_title('Stripplot of Personal Loan vs Income',y=1.05, **FONT)
ax[0,1].set_title('Stripplot of Personal Loan vs CCAvg',y=1.05, **FONT)
plt.tight_layout()
plt.show()


# 👉 According to above plots:
#  - All customers with  of more than`$10 thousand` and with Education level 2 or 3, accepted Personal Loans.
#  - All customers with CCAvg of more than `$5 thousand` and with Education level 2 or 3, accepted Personal Loans.
#  - All customers with Income of more than `$10 thousand` and Family 3 or 4, accepted Personal Loans.
#  - All customers with CCAvg of more than `$5 thousand` and by Family 3 or 4, accepted Personal Loans.
#  - Most customers with Income of more than `$10 thousand` and by CD Account 1, accepted Personal Loans.
#  - Most customers with CCAvg of more than `$5 thousand` and by CD Account 1, accepted Personal Loans.
# 

# <a id="model"></a>
# # <p style="background-color:#0c4510;font-family:newtimeroman;font-size:120%;color:orange;text-align:center;border-radius:15px 50px; padding:7px">6. Models and Improve Models</p>
# 
# [🏠 Tabel of Contents](#tabel)

# Due to the fact that the desired target has a label and the problem is of classification type, we use KNN, LogisticRegression, Naive Bayes, DTs and RF algorithms.
# 
# Now, see our dataset again:

# In[30]:


df


# This is the dataset used to build the model. For this, we first determine the values of X and Y and then check the different models in order:

# In[31]:


# define x and y
x = df.drop('Personal Loan', axis=1)
y = df['Personal Loan'].values.reshape(-1,1)


# In[32]:


Model = []
FPR = []
TPR = []
ACC_test = []
ACC_train = []
Recall = []
Precision = []
F1 = []
AUC = []

def delete_results():
    """Delete results of Previous models for preveing to avoid congestion in ROC charts"""
    global FPR, TPR, ACC_test, ACC_train, Recall, Precision, F1, AUC
    del FPR[:]
    del TPR[:]
    del ACC_test[:]
    del ACC_train[:]
    del Recall[:]
    del Precision[:]
    del F1[:]
    del AUC[:]

def plot_confusion_matrix2(cm, classes,
                          title='Confusion matrix',
                          cmap=plt.cm.Blues):
    """
    This function plots the confusion matrix.
        cm(array): confusion matrix
        classes(dictionary): classes of our target (key=categorical type, value=numerical type)
    """
    plt.figure(figsize=(10,7))
    plt.grid(False)
    plt.imshow(cm, interpolation='nearest', cmap=cmap)
    plt.title(title)
    plt.colorbar()
    tick_marks = np.arange(len(classes))

    plt.xticks(tick_marks, [f"{value}={key}" for key , value in classes.items()], rotation=45)
    plt.yticks(tick_marks, [f"{value}={key}" for key , value in classes.items()])
    names = ['True Neg', 'False Pos', 'False Neg', 'True Pos']

    thresh = cm.max() / 2.
    for k, (i,j) in enumerate(itertools.product(range(cm.shape[0]), range(cm.shape[1]))):
        plt.text(j, i, f"{names[k]}\n{cm[i,j]}\n{cm[i,j]/np.sum(cm)*100:.2f}%",
                 horizontalalignment="center",
                 color="white" if cm[i, j] > thresh else "black")

    
    plt.ylabel('Actual')
    plt.xlabel('Predicted')
    plt.tight_layout()
    plt.show()

# --------------------------------------------------------------------------------------

def Perform_cross_val(model, k, x, y, scoring):
    """
    perform cross validation
        model: model
        k(scaler): the value for n_splits in KFold()
        x(DataFrame or array):  x_train
        y(DataFrame or array): y_train
        scoring(string): an approach for evaluation in cross validation
    """

    kf = StratifiedKFold(n_splits=k)
    cv_results = cross_val_score(model, x, y.ravel(), cv=kf, scoring=scoring)
    cv_mean = np.mean(cv_results)
    
    print('-'*20, f"CV for k={k}, scoring={scoring}", '-'*20)
    print(f"CV mean: {cv_mean}")
    print(f"CV results: {cv_results}\n")

# --------------------------------------------------------------------------------------

def find_fold_index(k, x):
    """
    Find fold index in kfold
        k(scaler): the value used for n_splits in KFold()
        x(DataFrame or array): x_train
    """

    my_fold_index = []
    j=1
    for _ , test in KFold(k).split(x):

        my_fold_index = []
        for i in test:
            my_fold_index.append(i)
        print(f"fold {j}: [{my_fold_index[0]},{my_fold_index[-1]}]")
        print(20*'-')
        j += 1

# --------------------------------------------------------------------------------------

def change_test_size(model, x, y, name):
    # try to imporve model by changing test_size
    test_sizes= [0.2, 0.25, 0.3, 0.35, 0.4, 0.45]
    acc_table = pd.DataFrame(columns=['Model', 'test_size', 'ACC_train', 'ACC_test', 'Recall_train', 'Recall_test'])
    for i, test_size in enumerate(test_sizes):
        x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=test_size, random_state=0, stratify=y)
        model.fit(x_train, y_train.ravel())
        y_pred_train = model.predict(x_train)
        y_pred_test = model.predict(x_test)
        acc_test_i = accuracy_score(y_test, y_pred_test)
        acc_train_i = accuracy_score(y_train, y_pred_train)
        rec_test_i = recall_score(y_test, y_pred_test)
        rec_train_i = recall_score(y_train, y_pred_train)
        acc_table.loc[len(acc_table.index)] = [f"{name} {i+1}", str(test_size), acc_train_i, acc_test_i, rec_train_i, rec_test_i]
    return acc_table.sort_values(by=['Recall_test'], ascending=False).style.background_gradient(cmap='summer_r')

# --------------------------------------------------------------------------------------

def plot_results(FPR, TPR, AUC, ACC_test, ACC_train, Recall, Precision, F1, y_proba_test, y_test, model_name, Model):
    """
    draw ROC curve and plot of Recall, precision, f1 score etc.
        FPR(list): list of False Positive Rate
        TPR(list): list of True Positive Rate
        ACC(list): list of accuracy of models
        Recall(list): list of recall score of models
        Precision(list): list of Precision score of models
        F1(list): list of F1 score of models 
        classes(dictionary): classes of our target (key=categorical type, value=numerical type)
    """
    fig1 = go.Figure()
    fig2 = go.Figure()
    # the green line represents where TPR = FPR
    fig1.add_shape(type='line', line=dict(color='green', dash='dash'),x0=0, x1=1, y0=0, y1=1)
    for fpr_i, tpr_i, auc_i, name in zip(FPR, TPR, AUC, Model):
        # ROC Curve
        fig1.add_trace(go.Scatter(x=fpr_i, y=tpr_i, name=f"{name} AUC = {auc_i:.4f}", mode='lines'))
    # the histogram of scores compared to true labels
    fig_hist = px.histogram(x=y_proba_test[:,1], color=y_test.ravel(), nbins=50, labels=dict(color='Personal Loan', x='Probability'))
    fig2.add_trace(fig_hist.data[0])
    fig2.add_trace(fig_hist.data[1])
    # Reduce opacity to see both histograms
    fig2.update_traces(opacity=0.75)

    # Accuracy plot
    fig3 = make_subplots(rows=1, cols=2)
    fig3.add_trace(go.Scatter(y=ACC_test, mode='lines+markers', name='ACC test', hovertemplate="<b>%{text}</b><br>" +"(%{x},%{y})", text=Model), row=1, col=1)
    fig3.add_trace(go.Scatter(y=Recall, mode='lines+markers', name='Recall', hovertemplate="<b>%{text}</b><br>" +"(%{x},%{y})", text=Model), row=1, col=1)
    fig3.add_trace(go.Scatter(y=Precision, mode='lines+markers', name='Precision', hovertemplate="<b>%{text}</b><br>" +"(%{x},%{y})", text=Model), row=1, col=1)
    fig3.add_trace(go.Scatter(y=F1, mode='lines+markers', name='F1 score', hovertemplate="<b>%{text}</b><br>" +"(%{x},%{y})", text=Model), row=1, col=1)

    fig3.add_trace(go.Scatter(y=ACC_train, mode='lines+markers', name='ACC train', hovertemplate="<b>%{text}</b><br>" +"(%{x},%{y})", text=Model), row=1, col=2)
    fig3.add_trace(go.Scatter(y=ACC_test, mode='lines+markers', name='ACC test', hovertemplate="<b>%{text}</b><br>" +"(%{x},%{y})", text=Model), row=1, col=2)

    # update layout and show figs
    
    fig1.update_layout(
        title= 'ROC curve and AUC score',
        xaxis_title='False Positive Rate',
        yaxis_title='True Positive Rate',
        yaxis=dict(scaleanchor="x", scaleratio=1),
        xaxis=dict(constrain='domain'),
        width=700, height=500,
        showlegend=True)
    fig2.update_layout(
        # showlegend=True, 
        barmode='overlay',  # Overlay both histograms
        title='Interpret ROC curve by histogram',
        xaxis_title='Probability',
        yaxis_title='Count')
        
    fig3.update_layout(
        showlegend=True,
        title='Model Evaluation & Train and Test Accuracy)',
        xaxis_title='Model',
        yaxis_title='Evaluation measure')
    # Set custom x-axis labels
    fig3.update_xaxes(ticktext=list(range(1,20)))
    fig1.show()
    fig2.show()
    fig3.show()

# --------------------------------------------------------------------------------------

def modeling(clf, x, y, test_size, classes, model_name, stratify=False):

    # split data to train and test
    if stratify:
        x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=test_size, random_state=0, stratify=y)
    else:
        x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=test_size, random_state=0)
    print(20*'-', 'Shape', 20*'-')
    print(f"x_train: {x_train.shape}")
    print(f"y_train: {y_train.shape}")
    print(f"x_test: {x_test.shape}")
    print(f"y_test: {y_test.shape}")

    classes1 = np.unique(y_test)
    total = len(y_test)
    print(15*'-', 'Class Distribution in y_test', 15*'-')
    for c in classes1:
        n_examples = len(y_test[y_test==c])
        percent = n_examples / total * 100
        print(f"> Class={c:d} : {n_examples:d}/{total:d} ({percent:.1f}%)")
    
    classes1 = np.unique(y_train)
    total = len(y_train)
    print(15*'-', 'Class Distribution in y_train', 15*'-')
    for c in classes1:
        n_examples = len(y_train[y_train==c])
        percent = n_examples / total * 100
        print(f"> Class={c:d} : {n_examples:d}/{total:d} ({percent:.1f}%)")
    
    # Normalization
    # scaler = MinMaxScaler().fit(x_train)
    x_norm_train = x_train
    x_norm_test = x_test
    # define model and fit model
    clf.fit(x_train, y_train.ravel())

    # prediction and results
    y_pred_train = clf.predict(x_train)
    y_pred_test = clf.predict(x_test)
    y_proba_train = clf.predict_proba(x_train)
    y_proba_test = clf.predict_proba(x_test)
    fpr, tpr, _ = roc_curve(y_test, y_proba_test[:,1])
    roc_auc = auc(fpr, tpr)

    cm = confusion_matrix(y_test, y_pred_test)
    acc_test = accuracy_score(y_test, y_pred_test)
    acc_train = accuracy_score(y_train, y_pred_train)
    rec_test = recall_score(y_test, y_pred_test)
    rec_train = recall_score(y_train, y_pred_train)
    pre = precision_score(y_test, y_pred_test)
    f1 = f1_score(y_test, y_pred_test)

    # append results
    Model.append(model_name)
    FPR.append(fpr)
    TPR.append(tpr)
    ACC_test.append(acc_test)
    ACC_train.append(acc_train)
    Recall.append(rec_test)
    Precision.append(pre)
    F1.append(f1)
    AUC.append(roc_auc)

    plot_results(FPR, TPR, AUC, ACC_test, ACC_train, Recall, Precision, F1, y_proba_test, y_test, model_name, Model)

    # Evaluation model
    print('-'*20 , 'Confusion Matrix', '-'*20)
    print(cm)
    plot_confusion_matrix2(cm, classes,
                          title='Confusion matrix',
                          cmap=plt.cm.Blues)
    # or use plot_confusion_matrix from sklearn.metrics
    print('-'*20 , 'Classification Report', '-'*20)
    print(classification_report(y_test, y_pred_test, ), '\n')
    print(f"Jaccard Score: {jaccard_score(y_test, y_pred_test)}")
    print(f"Log loss: {log_loss(y_test, y_pred_test)}", '\n')

    # print other result about predicted data
    return acc_test, acc_train, rec_test, rec_train


# <a id="multinomial"></a>
# # <p style="background-color:#0c4510;font-family:newtimeroman;font-size:100%;color:orange;text-align:center;border-radius:15px 50px; padding:7px">6.1. MultinomialNB( )</p>
# 
# [🏠 Tabel of Contents](#tabel)

# In[33]:


# split train and test data by inital test_size=0.2
# stratify used for considering class distribution in spliting data
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=0, stratify=y)


# In[34]:


# Check cross validation on Multinomial model to estimate model performance (Accuracy)
# use MinMaxScaler instead of StandardScaler for prevent negative number
pipe1 = Pipeline([('scaler', MinMaxScaler()), ('clf', MultinomialNB())])
Perform_cross_val(pipe1, k=10, x=x_train, y=y_train, scoring='accuracy')


# In[35]:


# Check cross validation on Multinomial model to estimate model performance (Recall)
Perform_cross_val(pipe1, k=10, x=x_train, y=y_train, scoring='recall')


# According to the obtained result, we expect our MultinomialNB model to have an accuracy close to or greater than 0.90 and low recall. Let's check it:

# In[36]:


# create initial model with MultinomialNB algorithm
acc_test_1_1, acc_train_1_1, rec_test_1_1, rec_train_1_1 = modeling(
    clf=pipe1,
    x=x,
    y=y,
    test_size=0.2,
    classes={'Not Accepted':0, 'Accepted':1},
    model_name='MultinomialNB 1',
    stratify=True)


# Since not being able to identify a potential customer is the biggest loss, hence recall is the right metric to check the performance of the model:

# In[37]:


print(f"Recall train: {rec_train_1_1}")
print(f"Recall test: {rec_test_1_1}")


# As we expected, the test accuracy obtained is close to the accuracy obtained from cross-validation. This model has correctly predicted almost all values with class 0, but it has performed extremely poorly in predicting class 1, which is due to the lack of data with class 1. Also, 95 people who accepted a personal loan were wrongly predicted, which is a relatively large number.
# 
# Based on this, maybe other values of test size will improve the performance of the model.

# In[38]:


# check improve model by change test size
change_test_size(pipe1, x, y, 'MultinomialNB')


# > So best model by MultinomialNB algorithm is the initail model.

# In[39]:


# create a Dataframe for store accuracy and recall of best model for each algorithm
best_model_test = pd.DataFrame({'Model':[], 'test_size':[], 'Test_Accuracy':[], 'Test_Recall':[]})
best_model_train = pd.DataFrame({'Model':[], 'test_size':[], 'Train_Accuracy':[], 'Train_Recall':[]})
# add best model and its accuracy and recall
best_model_test.loc[len(best_model_test.index)] = [f"MultinomialNB", '0.2', acc_test_1_1, rec_test_1_1]
best_model_train.loc[len(best_model_train.index)] = [f"MultinomialNB", '0.2', acc_train_1_1, rec_train_1_1]


# <a id="categorical"></a>
# # <p style="background-color:#0c4510;font-family:newtimeroman;font-size:100%;color:orange;text-align:center;border-radius:15px 50px; padding:7px">6.2. CategoricalNB( )</p>
# 
# [🏠 Tabel of Contents](#tabel)

# To apply this algorithm, all the features must be of category type, so it is necessary to create and save changes in the previous dataset:

# In[40]:


df.Age.describe()


# We can see here that the minimum and maximum ages are 23 and 67 respectively.
# 
# 👉 The age will be divided into **5 age categories**:
# *  Below 30 y.o.
# *  30 - 39 y.o.
# *  40 - 49 y.o.
# *  50 - 59 y.o.
# *  Above 60.

# In[41]:


df2 = df.copy()


# In[42]:


bin_age = [0, 29, 39, 49, 59, 70]
category_age = ['<30s', '30s', '40s', '50s', '>50s']
df2['Age_binned'] = pd.cut(df2['Age'], bins=bin_age, labels=category_age)
df2 = df2.drop(['Age'], axis = 1)


# In[43]:


df.Experience.describe()


# We can see here that the minimum and maximum Experience are 0 and 43 respectively.
# 
# 👉 The age will be divided into **5 Experience categories**:
# *  Below 10 y.o.
# *  10 - 19 y.o.
# *  20 - 29 y.o.
# *  30 - 39 y.o.
# *  Above 40.

# In[44]:


bin_experience = [-1, 9, 19, 29, 39, 50]
category_experience = ['<10s', '10s', '20s', '30s', '>30s']
df2['Experience_binned'] = pd.cut(df2['Experience'], bins=bin_experience, labels=category_experience)
df2 = df2.drop(['Experience'], axis = 1)


# In[45]:


df.Income.describe()


# We can see here that the minimum and maximum Income are 0.67 and 18.67 respectively.
# 
# 👉 The age will be divided into **4 Income categories**:
# *  Below 5 y.o.
# *  5 - 9 y.o.
# *  10 - 14 y.o.
# *  Above 15.

# In[46]:


bin_income = [0, 4, 9, 14, 20]
category_income = ['<5s', '5s', '10s', '10>s']
df2['Income_binned'] = pd.cut(df2['Income'], bins=bin_income, labels=category_income)
df2 = df2.drop(['Income'], axis = 1)


# In[47]:


df.CCAvg.describe()


# We can see here that the minimum and maximum CCAvg are 0 and 10 respectively.
# 
# 👉 The age will be divided into **5 CCAvg categories**:
# *  Below 2 y.o.
# *  2 - 3 y.o.
# *  4 - 5 y.o.
# *  6 - 7 y.o.
# *  Above 8.

# In[48]:


bin_CCAvg = [-1, 1, 3, 5, 7, 10]
category_CCAvg = ['<2s', '2s', '4s', '6s', '>6s']
df2['CCAvg_binned'] = pd.cut(df2['CCAvg'], bins=bin_CCAvg, labels=category_CCAvg)
df2 = df2.drop(['CCAvg'], axis = 1)


# In[49]:


df.Mortgage.describe()


# We can see here that the minimum and maximum Mortgage are 0 and 635 respectively.
# 
# 👉 The age will be divided into **9 Mortgage categories**:
# *  Below 50 y.o.
# *  50 - 99 y.o.
# *  100 - 149 y.o.
# *  150 - 199 y.o.
# *  200 - 249 y.o.
# *  250 - 299 y.o.
# *  300 - 349 y.o.
# *  350 - 399 y.o.
# *  Above 400.

# In[50]:


bin_Mortgage = [-1, 49, 99, 149, 199, 249, 299, 349, 399, 700]
category_Mortgage = ['<50s', '50s', '100s', '150s', '200s', '250s', '300s', '350s', '>350']
df2['Mortgage_binned'] = pd.cut(df2['Mortgage'], bins=bin_Mortgage, labels=category_Mortgage)
df2 = df2.drop(['Mortgage'], axis = 1)


# In[51]:


# convert int64 type to category type because we want to use get dummies
df2[df2.select_dtypes('int64').columns] = df2.select_dtypes('int64').astype('category')
df2.info()


# In[52]:


df2.isna().sum()


# In[53]:


df2


# In[54]:


# use get dummies
df3 = pd.get_dummies(df2.drop('Personal Loan', axis=1))
df3.insert(0, 'Personal Loan', df2['Personal Loan'])
df3 = df3.astype('int64')
df3


# Now, we can use CategoricalNB, ComplementNB and BernoulliNB algorithm:

# In[55]:


# first define new x and y for new dataset:
x2 = df3.drop('Personal Loan', axis=1)
y2 = df3[['Personal Loan']].values.reshape(-1,1)


# In[56]:


# split train and test data by inital test_size=0.2
# stratify used for considering class distribution in spliting data
x_train2, x_test2, y_train2, y_test2 = train_test_split(x2, y2, test_size=0.2, random_state=0, stratify=y2)


# In[57]:


# Check cross validation on CategoricalNB model to estimate model performance (accuracy)
pipe2 = Pipeline([('clf', CategoricalNB())])
Perform_cross_val(pipe2, k=10, x=x_train2, y=y_train2, scoring='accuracy')


# In[58]:


# Check cross validation on CategoricalNB model to estimate model performance (recall)
Perform_cross_val(pipe2, k=10, x=x_train2, y=y_train2, scoring='recall')


# According to the obtained result, we expect our ComplementNB model to have an accuracy close to or greater than 0.932. Also, according to the average recall value obtained above, we expect that the recall of this model is better than the previous model. Let's check it:

# In[59]:


# create initial model with CategoricalNB
acc_test_2_1, acc_train_2_1, rec_test_2_1, rec_train_2_1 = modeling(
    clf=pipe2,
    x=x2,
    y=y2,
    test_size=0.2,
    classes={'Not Accepted':0, 'Accepted':1},
    model_name='CategoricalNB 1',
    stratify=True)


# In[60]:


print(f"Recall train: {rec_train_2_1}")
print(f"Recall test: {rec_test_2_1}")


# The accuracy and recall obtained is the same as we expected. To improve models, other test size values are also checked:

# In[61]:


# check improve model by change test_size
change_test_size(pipe2, x2, y2, 'CategoricalNB')


# Despite the slight increase in the accuracy value, the recall value did not improve by changing the test size, so the initial CategoricalNB model is better.

# > So best model by CategoricalNB algorithm is the model by test_size = 0.2:

# In[62]:


# add best model and its accuracy and recall
best_model_test.loc[len(best_model_test.index)] = [f"CategoricalNB", '0.2', acc_test_2_1, rec_test_2_1]
best_model_train.loc[len(best_model_train.index)] = [f"CategoricalNB", '0.2', acc_train_2_1, rec_train_2_1]


# <a id="complement"></a>
# # <p style="background-color:#0c4510;font-family:newtimeroman;font-size:100%;color:orange;text-align:center;border-radius:15px 50px; padding:7px">6.3. ComplementNB( )</p>
# 
# [🏠 Tabel of Contents](#tabel)

# In[63]:


# Check cross validation on Complement model to estimate model performance (Accuracy)
pipe3 = Pipeline([('clf', ComplementNB())])
Perform_cross_val(pipe3, k=10, x=x_train2, y=y_train2, scoring='accuracy')


# In[64]:


# Check cross validation on Complement model to estimate model performance (Recall)
Perform_cross_val(pipe3, k=10, x=x_train2, y=y_train2, scoring='recall')


# According to the obtained result, we expect our ComplementNB model to have an accuracy close to or greater than 0.87 and better recall. Let's check it:

# In[65]:


# create initial model with ComplementlNB
acc_test_3_1, acc_train_3_1, rec_test_3_1, rec_train_3_1 = modeling(
    clf=pipe3,
    x=x2,
    y=y2,
    test_size=0.2,
    classes={'Not Accepted':0, 'Accepted':1},
    model_name='ComplementNB 1',
    stratify=True)


# In[66]:


print(f"Recall train: {rec_train_3_1}")
print(f"Recall test: {rec_test_3_1}")


# The accuracy obtained is almost the same as we expected, but overall the accuracy of the model has decreased and it is not as good as the multinomialNB model, but recall is important for us. To improve models, other test size values are also checked:

# In[67]:


# check improve model by change test_size
change_test_size(pipe3, x2, y2, 'ComplementNB')


# Despite the slight increase in the accuracy value, the recall value did not improve by changing the test size, so the initial ComplementNB model is better.

# > So best model by ComplementNB algorithm is the model by test_size = 0.2:

# In[68]:


# add best model and its accuracy and recall
best_model_test.loc[len(best_model_test.index)] = [f"ComplementNB", '0.2', acc_test_3_1, rec_test_3_1]
best_model_train.loc[len(best_model_train.index)] = [f"ComplementNB", '0.2', acc_train_3_1, rec_train_3_1]


# <a id="bernoulli"></a>
# # <p style="background-color:#0c4510;font-family:newtimeroman;font-size:100%;color:orange;text-align:center;border-radius:15px 50px; padding:7px">6.4. BernoulliNB( )</p>
# 
# [🏠 Tabel of Contents](#tabel)

# In[69]:


# split train and test data by inital test_size=0.2
# stratify used for considering class distribution in spliting data
x_train2, x_test2, y_train2, y_test2 = train_test_split(x2, y2, test_size=0.2, random_state=0, stratify=y2)


# In[70]:


# Check cross validation on BernoulliNB model to estimate model performance (Accuracy)
pipe4 = Pipeline([('clf', BernoulliNB())])
Perform_cross_val(pipe4, k=10, x=x_train2, y=y_train2, scoring='accuracy')


# In[71]:


# Check cross validation on BernoulliNB model to estimate model performance (Recall)
Perform_cross_val(pipe4, k=10, x=x_train2, y=y_train2, scoring='recall')


# According to the obtained result, we expect our BernoulliNB model to have an accuracy close to or greater than 0.93 and the recall value is lower than the complementNB model. Let's check it:

# In[72]:


# create initial model with BernoulliNB and test_size=0.2
acc_test_4_1, acc_train_4_1, rec_test_4_1, rec_train_4_1 = modeling(
    clf=pipe4,
    x=x2,
    y=y2,
    test_size=0.2,
    classes={'Not Accepted':0, 'Accepted':1},
    model_name='BernoulliNB 1',
    stratify=True)


# In[73]:


print(f"Recall train: {rec_train_4_1}")
print(f"Recall test: {rec_test_4_1}")


# The accuracy and recall obtained is the same as we expected. To improve models, other test size values are also checked:

# In[74]:


# check imporve model by change test_size
change_test_size(pipe4, x2, y2, 'BernoulliNB')


# Despite the slight increase in the accuracy value, the recall value did not improve by changing the test size, so the initial CategoricalNB model is better.

# > So best model by BernoulliNB algorithm is the model by test_size = 0.2:

# In[75]:


# add best model and its accuracy and recall
best_model_test.loc[len(best_model_test.index)] = [f"BernoulliNB", '0.2', acc_test_4_1, rec_test_4_1]
best_model_train.loc[len(best_model_train.index)] = [f"BernoulliNB", '0.2', acc_train_4_1, rec_train_4_1]


# <a id="logisitc"></a>
# # <p style="background-color:#0c4510;font-family:newtimeroman;font-size:100%;color:orange;text-align:center;border-radius:15px 50px; padding:7px">6.5. LogisitcRegression( )</p>
# 
# [🏠 Tabel of Contents](#tabel)

# In this model, we will use our first dataset df and x and y:

# In[76]:


# split train and test data by inital test_size=0.2
# stratify used for considering class distribution in spliting data
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=0, stratify=y)


# In[77]:


# Check cross validation on LogisticRegression model to estimate model performance (Accuracy)
logreg = Pipeline([('scaler', StandardScaler()), ('clf', LogisticRegression(solver='newton-cg'))])
Perform_cross_val(logreg, k=10, x=x_train, y=y_train, scoring='accuracy')


# In[78]:


# Check cross validation on LogisticRegression model to estimate model performance (Recall)
Perform_cross_val(logreg, k=10, x=x_train, y=y_train, scoring='recall')


# According to the obtained result, we expect our LogisticRegression model to have an high accuracy so far close to or greater than 0.95 but its recall lower than previous model. Let's check it:

# In[79]:


# create initial model with LogisticRegression and test_size=0.2
acc_test_5_1, acc_train_5_1, rec_test_5_1, rec_train_5_1 = modeling(
    clf=logreg,
    x=x,
    y=y,
    test_size=0.2,
    classes={'Not Accepted':0, 'Accepted':1},
    model_name='LogisticReg 1',
    stratify=True)


# In[80]:


print(f"Recall train: {rec_train_5_1}")
print(f"Recall test: {rec_test_5_1}")


# The accuracy and recall obtained is the same as we expected. To improve models, other test size values are also checked:

# In[81]:


# try to imporve model by changing test_size
pipe5_1 = Pipeline([('scaler', StandardScaler()), ('clf', LogisticRegression())])
change_test_size(pipe5_1, x, y, 'LogisticReg')


# In[82]:


# find best parameters for Logistic Regression estimator
# define models and parameters
model = LogisticRegression()
solvers = ['newton-cg', 'lbfgs', 'liblinear', 'sag', 'saga']
penalty = ['none','l2', 'l1']
c_values = [100, 10, 1.0, 0.1, 0.01]
# define grid search
grid = dict(solver=solvers,penalty=penalty,C=c_values)
cv = StratifiedKFold(n_splits=10, shuffle=True, random_state=0)
grid_search = GridSearchCV(estimator=model, param_grid=grid, n_jobs=-1, cv=cv, scoring='recall',error_score=0)
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=0, stratify=y)
scaler = StandardScaler().fit(x_train)
x_norm_train = scaler.transform(x_train)
x_norm_test = scaler.transform(x_test)
grid_result = grid_search.fit(x_norm_train, y_train.ravel())
# summarize results
print(f"Best: {grid_result.best_score_} using {grid_result.best_params_}")
means = grid_result.cv_results_['mean_test_score']
stds = grid_result.cv_results_['std_test_score']
params = grid_result.cv_results_['params']
for mean, stdev, param in zip(means, stds, params):
    print(f"{mean} ({stdev}) with: {param}")


# <div class="alert alert-block alert-info" style="font-size:14px; font-family:verdana;">
#     📌You may see some warnings during the optimization for invalid configuration combinations. These can be safely ignored.
# </div>
# 
# The results are summarized as follows:
# 
#     Best: 0.6251012145748989 using {'C': 1.0, 'penalty': 'l1', 'solver': 'liblinear'}

# In[83]:


# create better LogisticRegression model
logreg2 = LogisticRegression(solver='liblinear', penalty='l1', C=1, n_jobs=-1)
pipe5_2 = Pipeline([('scaler', StandardScaler()), ('clf', logreg2)])
acc_test_5_2, acc_train_5_2, rec_test_5_2, rec_train_5_2 = modeling(
    clf=pipe5_2,
    x=x,
    y=y,
    test_size=0.2,
    classes={'Not Accepted':0, 'Accepted':1},
    model_name='LogisticReg 2',
    stratify=True)


# In[84]:


print(f"Recall train: {rec_train_5_2}")
print(f"Recall test: {rec_test_5_2}")


# In[85]:


# check improve model by change test_size
change_test_size(pipe5_2, x, y, 'LogisticReg')


# > So best model by LogisticRegression algorithm is the model by test_size = 0.2:

# In[86]:


# add best model and its accuracy and recall
best_model_test.loc[len(best_model_test.index)] = [f"LogisticReg", '0.2', acc_test_5_2, rec_test_5_2]
best_model_train.loc[len(best_model_train.index)] = [f"LogisticReg", '0.2', acc_train_5_2, rec_train_5_2]


# <a id="knn"></a>
# # <p style="background-color:#0c4510;font-family:newtimeroman;font-size:100%;color:orange;text-align:center;border-radius:15px 50px; padding:7px">6.6. KNN: KNeighborsClassifier( ) </p>
# 
# [🏠 Tabel of Contents](#tabel)

# In[87]:


def knn_model(x, y, Ks, test_size, show_plot=1, stratify=True):
    """fit knn algorithm, predict x_test and draw plots if you want
    
        x (DataFrame or array): features
        y (DataFrame or array): target
        test_size (float): parameter that use for split data to train and test set
        show_plot (1 or any): for draw plots
        
        Retrun Accuracy_train and Accuracy_test"""

    # split dataset   
    if stratify:
        x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=test_size, random_state=0, stratify=y)
    else:
        x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=test_size, random_state=0)

    print('-'*20, 'Shape', '-'*20)
    print ('Train set:', x_train.shape,  y_train.shape)
    print ('Test set:', x_test.shape,  y_test.shape, '\n')

    # initial values and constants
    Ks = Ks
    ACC_train = np.zeros((Ks))
    ACC_test = np.zeros((Ks))
    REC_train = np.zeros((Ks))
    REC_test = np.zeros((Ks))

    # for loop for find best k 
    for k in range(1,Ks+1):
        # train model and predict
        pipe = Pipeline([('scaler', StandardScaler()), ('clf', KNeighborsClassifier(n_neighbors=k))])
        pipe.fit(x_train, y_train.ravel())
        y_pred_train = pipe.predict(x_train)
        y_pred_test = pipe.predict(x_test)
        ACC_train[k-1] = accuracy_score(y_train, y_pred_train)
        ACC_test[k-1] = accuracy_score(y_test, y_pred_test)
        REC_train[k-1] = recall_score(y_train, y_pred_train)
        REC_test[k-1] = recall_score(y_test, y_pred_test)

    # draw plots
    if show_plot == 1:    
        x = list(range(1,Ks+1))
        x_rev = x[::-1]

        # Train Accuracy line
        y1 = ACC_train
        # Test Accuracy line
        y2 = ACC_test
        # Train Recall line
        y3 = REC_train
        # Test Recall line
        y4 = REC_test

        fig = make_subplots(rows=1, cols=2, subplot_titles=("Accuracy", "Recall"))
        
        # Train Accuracy plot (in 1st subplot)
        fig.add_trace(go.Scatter(
            x=x, y=y1,
            line_color='rgb(0,100,80)',
            name='Train Accuracy',
        ), row=1, col=1)

        # Test Accuracy plot (in 1st subplot)
        fig.add_trace(go.Scatter(
            x=x, y=y2,
            line_color='rgb(255,140,0)',
            name='Test Accuracy',
        ), row=1, col=1)

# ----------------------------------------------------------------------------------------------------

        # # Train Recall plot (in 2nd subplot)
        fig.add_trace(go.Scatter(
            x=x, y=y3,
            line_color='rgb(212, 31, 13)',
            name='Train Recall',
        ), row=1, col=2)

        # Test Recall plot (in 2nd subplot)
        fig.add_trace(go.Scatter(
            x=x, y=y4,
            line_color='rgb(13, 109, 212)',
            name='Test Recall',
        ), row=1, col=2)

        # Update xaxis properties
        fig.update_xaxes(title_text="Number of Neighbors (k)", row=1, col=1)
        fig.update_xaxes(title_text="Number of Neighbors (k)", row=1, col=2)

        # Update yaxis properties
        fig.update_yaxes(title_text="Accuracy", row=1, col=1)
        fig.update_yaxes(title_text="Recall", row=1, col=2)

        fig.update_traces(mode='lines')
        fig.update_layout(title_text="Accuracy and Recall of KNN models for all k")
        fig.show()

    # print results
    print( f"The best train accuracy was {ACC_train.max()} with {ACC_train.argmax()+1}") 
    print( f"The best test accuracy was {ACC_test.max()} with {ACC_test.argmax()+1}")
    print( f"The best train recall was {REC_train.max()} with {REC_train.argmax()+1}")
    print( f"The best test recall was {REC_test.max()} with {REC_test.argmax()+1}")
    
    return  ACC_test, ACC_train, REC_test, REC_train


# In[88]:


# split train and test data by inital test_size=0.2
# stratify used for considering class distribution in spliting data
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=0, stratify=y)


# In[89]:


# Check cross validation on KNN model to estimate model performance (Accuracy)
operations = [('scaler', StandardScaler()), ('knn', KNeighborsClassifier())]
pipe6_1 = Pipeline(operations)
Perform_cross_val(pipe6_1, k=10, x=x_train, y=y_train, scoring='accuracy')


# In[90]:


# Check cross validation on KNN model to estimate model performance (Recall)
Perform_cross_val(pipe6_1, k=10, x=x_train, y=y_train, scoring='recall')


# According to the obtained result, we expect our KNN model to have an accuracy close to or greater than 0.957. Let's check it:

# In[91]:


# find best k for knn model
acc_test_6_1, acc_train_6_1, rec_test_6_1, rec_train_6_1 = knn_model(x, y, 30, 0.2, show_plot=1, stratify=True)


# In[92]:


# check improve model by change test_size
change_test_size(pipe6_1, x, y, 'KNN')


# The best value of k for the accuracy of the model is 3, but recall is important for us and for this, k is 1, but this value, as is known, causes the model to overfit. The best k for recall that performs best after k=1 and does not cause the model to overfit is k=3. (Because it is a classification problem, it is better to use even k)

# In[93]:


# create better model on KNN algorithm by k=3
knn = KNeighborsClassifier(n_neighbors=3)
pipe6_2 = Pipeline([('scaler', StandardScaler()), ('clf', knn)])
acc_test_6_1, acc_train_6_1, rec_test_6_1, rec_train_6_1 = modeling(
    clf=pipe6_2,
    x=x,
    y=y,
    test_size=0.2,
    classes={'Not Accepted':0, 'Accepted':1},
    model_name='KNN1',
    stratify=True)


# In[94]:


print(f"Recall train: {rec_train_6_1}")
print(f"Recall test: {rec_test_6_1}")


# In[95]:


# knn parameter tuning with gridsearch
kValues = list(range(3, 31, 2))
weights = ['uniform','distance']
algorithm = ['auto', 'ball_tree', 'kd_tree', 'brute']
p = [1,2]
param_grid = dict(knn__n_neighbors=kValues, knn__weights=weights, knn__algorithm=algorithm, knn__p=p)
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=0, stratify=y)
classifier = GridSearchCV(pipe6_1, param_grid, cv=10, scoring='recall')
classifier.fit(x_train, y_train.ravel())


# In[96]:


results1 = classifier.best_estimator_.get_params()
df_results1 = pd.DataFrame(results1).T.rename(columns={0: "Values1", 1: "Values2"})
df_results1


# In[97]:


df_results2 = pd.DataFrame(classifier.cv_results_)
df_results2


# In the above tables, the best model is a model with n_neighbors = 3, P = 2, algorithm = auto and weights = distance that is a default model.

# > So best model by KNN algorithm is the model by test_size = 0.2 and k=3:

# In[98]:


# add best model and its accuracy and recall
best_model_test.loc[len(best_model_test.index)] = [f"KNN (k=3)", '0.2', acc_test_6_1, rec_test_6_1]
best_model_train.loc[len(best_model_train.index)] = [f"KNN (k=3)", '0.2', acc_train_6_1, rec_train_6_1]


# <a id="dt"></a>
# # <p style="background-color:#0c4510;font-family:newtimeroman;font-size:100%;color:orange;text-align:center;border-radius:15px 50px; padding:7px">6.7. Decision Tree </p>
# 
# [🏠 Tabel of Contents](#tabel)

# In[99]:


df


# In[100]:


# Check cross validation on DT model to estimate model performance (Accuracy)
operations = [('DTs', DecisionTreeClassifier(max_depth=3))]
pipe7_1 = Pipeline(operations)
Perform_cross_val(pipe7_1, k=10, x=x_train, y=y_train, scoring='accuracy')


# In[101]:


# Check cross validation on DT model to estimate model performance (Recall)
Perform_cross_val(pipe7_1, k=10, x=x_train, y=y_train, scoring='recall')


# Based on the results obtained above, we expect the model to have an accuracy of around 98% and its recall to be high. Let's check it:

# In[102]:


# create initial DTs model without pruning
dts = DecisionTreeClassifier(random_state=0)
pipe7_1 = Pipeline([('scaler', StandardScaler()), ('clf', dts)])
acc_test_7_1, acc_train_7_1, rec_test_7_1, rec_train_7_1 = modeling(
    clf=pipe7_1,
    x=x,
    y=y,
    test_size=0.2,
    classes={'Not Accepted':0, 'Accepted':1},
    model_name='DT 1',
    stratify=True)


# In[103]:


print(f"Train Accuracy: {acc_train_7_1}")
print(f"Test Accuracy: {acc_test_7_1}")
print(f"Train Recall: {rec_train_7_1}")
print(f"Test Recall: {rec_test_7_1}")


# In[104]:


clf = DecisionTreeClassifier(random_state=0)
clf.fit(x_train,y_train.ravel())
y_train_predicted=clf.predict(x_train)
y_test_predicted=clf.predict(x_test)
print(f"Train Accuracy: {accuracy_score(y_train,y_train_predicted)}")
print(f"Test Accuracy: {accuracy_score(y_test,y_test_predicted)}")
print(f"Train Recall: {recall_score(y_train,y_train_predicted)}")
print(f"Test Recall: {recall_score(y_test,y_test_predicted)}")


# In[105]:


# visualizing tree
from sklearn import tree
feature_names = x.columns
target_names = ['0', '1']
fig = plt.figure(figsize=(25,20))
dt1 = DecisionTreeClassifier(random_state=0)
dt1.fit(x_train,y_train.ravel())
plot = tree.plot_tree(
    dt1,
    feature_names = feature_names,
    class_names = target_names,
    filled=True)
plt.show()


# According to the obtained result, our model is overfitting and our tree has many rules. This is a common problem in decision trees. To solve this problem, we use pruning techniques

# In[106]:


# Grid of parameters to choose from
grid_param={"criterion":["gini","entropy"],
             "max_depth":range(2,10,1),
             "min_samples_leaf":range(1,15,1),
             "min_samples_split":range(2,20,1) 
            }
cv = StratifiedKFold(n_splits=10)
grid_search=GridSearchCV(estimator=dt1,param_grid=grid_param,cv=cv,n_jobs=-1)
grid_search.fit(x_train,y_train.ravel())


# In[107]:


print(grid_search.best_params_)


# In[108]:


dt2=DecisionTreeClassifier(
    criterion='gini',
    max_depth=5,
    min_samples_leaf=14,
    min_samples_split=2,
    splitter='random'
    )
dt2.fit(x_train,y_train.ravel())
plt.figure(figsize=(20,12), dpi=1000)
plot = tree.plot_tree(
    dt2,
    feature_names = feature_names,
    class_names = target_names,
    filled=True)
plt.show()


# In[109]:


# check Accuracy, Recanll and overfitting
y_predicted_train= dt2.predict(x_train)
y_predicted_test = dt2.predict(x_test)
print(f"Train Accuracy: {accuracy_score(y_train, y_predicted_train)}")
print(f"Test Accuracy: {accuracy_score(y_test, y_predicted_test)}")
print(f"Train Recall: {recall_score(y_train, y_predicted_train)}")
print(f"Test Recall: {recall_score(y_test, y_predicted_test)}")


# Our model is not overfit and the obtained results show high accuracy and recall

# In[110]:


importances = dt2.feature_importances_
indices = np.argsort(importances)

plt.figure(figsize=(8,8))
plt.title('Feature Importances')
plt.barh(range(len(indices)), importances[indices], color='green', align='center')
plt.yticks(range(len(indices)), [feature_names[i] for i in indices])
plt.xlabel('Relative Importance')
plt.show()


# In[111]:


cm = confusion_matrix(y_test, y_predicted_test)
plot_confusion_matrix2(cm=cm, classes={'Not Accepted':0, 'Accepted':1}, )
print(classification_report(y_test, y_predicted_test))


# - According to the figure above, as seen in the EDA section, the two features Education and Income have the most effect and importance.
# 
# - Important feature is Education, Income, Family, CCAvg, Securities Account, Online, Personal Loan
# 
# - Obtained recall is good ذut the model still incorrectly predicted 18 people who accepted the loan. Let's see if this value can be reduced or not:
# 
# Now we use post-pruning:

# In[112]:


path = dt1.cost_complexity_pruning_path(x_train, y_train)
#path variable gives two things ccp_alphas and impurities
ccp_alphas, impurities = path.ccp_alphas, path.impurities
print("ccp alpha wil give list of values :",ccp_alphas)
print("\n")
print("Impurities in Decision Tree :",impurities)


# In[113]:


# train a decision tree using the effective alphas
clfs = []
for ccp_alpha in ccp_alphas:
    clf = DecisionTreeClassifier(random_state=0, ccp_alpha=ccp_alpha)
    clf.fit(x_train, y_train.ravel())
    clfs.append(clf)
print(
    "Number of nodes in the last tree is: {} with ccp_alpha: {}".format(
        clfs[-1].tree_.node_count, ccp_alphas[-1]
    )
)


# In[114]:


# Visualizing the Recall score for train and test set:

train_scores = [recall_score(y_train, clf.predict(x_train)) for clf in clfs]
test_scores = [recall_score(y_test, clf.predict(x_test)) for clf in clfs]

fig = go.Figure()
fig.add_trace(go.Scatter(x=ccp_alphas, y=train_scores, name='Train Recall', mode='lines+markers', line={"shape": 'hv'}))
fig.add_trace(go.Scatter(x=ccp_alphas, y=test_scores, name='Test Recall', mode='lines+markers', line={"shape": 'hv'}))
fig.update_layout(
    xaxis_title='ccp_alphas',
    yaxis_title='Recall',
    title='Recall vs alpha for training and testing sets',
    template='seaborn')
fig.show()


# Best result that is not tend to overfit will obtain by ccp_alpha = 0.002868053

# In[115]:


# create better Decision Tree (Post_pruning)
dt3 = DecisionTreeClassifier(random_state=0, ccp_alpha=0.002868053)
dt3.fit(x_train,y_train.ravel())
fig = plt.figure(figsize=(10,10), dpi=100)
plot = tree.plot_tree(
    dt3,
    feature_names = feature_names,
    class_names = target_names,
    filled=True)

# for save tree plot
# fig.savefig('Tree.png')
plt.show()


# In[116]:


# for save decsition tree threshold in file
# text_representation = tree.export_text(dt3)
# with open( "decision_tree.log", "w") as file:
#     file.write(text_representation)


# In[117]:


# print results for check overfit
y_predicted_train= dt3.predict(x_train)
y_predicted_test = dt3.predict(x_test)
print(f"Train Accuracy: {accuracy_score(y_train, y_predicted_train)}")
print(f"Test Accuracy: {accuracy_score(y_test, y_predicted_test)}")
print(f"Train Recall: {recall_score(y_train, y_predicted_train)}")
print(f"Test Recall: {recall_score(y_test, y_predicted_test)}")


# In[118]:


# find important features
importances = dt3.feature_importances_
indices = np.argsort(importances)

plt.figure(figsize=(8,8))
plt.title('Feature Importances')
plt.barh(range(len(indices)), importances[indices], color='green', align='center')
plt.yticks(range(len(indices)), [feature_names[i] for i in indices])
plt.xlabel('Relative Importance')
plt.show()


# The drawn plot helps us to understand which features are less important and can be removed.

# In[119]:


# create better DTs model and draw plots
pipe7_2 = Pipeline([('scaler', StandardScaler()), ('clf', dt3)])
acc_test_7_2, acc_train_7_2, rec_test_7_2, rec_train_7_2 = modeling(
    clf=pipe7_2,
    x=x,
    y=y,
    test_size=0.2,
    classes={'Not Accepted':0, 'Accepted':1},
    model_name='DT 2',
    stratify=True)


# Nice result 😍 !!!
# 
# This Decision tree model that obtained by post pruning has given us best recall scores on data with 91.7% accuracy.
# 
# We obtained very good result that is not overfit and the model has wrongly predicted only 8 people who accepted the loan

# In[120]:


# check improve model by change test_size
change_test_size(pipe7_2, x, y, 'DT')


# > So best model by Decision Tree algorithm is the model by test_size = 0.2:

# In[121]:


# add best model and its accuracy and recall
best_model_test.loc[len(best_model_test.index)] = [f"Decision Tree", '0.2', acc_test_7_2, rec_test_7_2]
best_model_train.loc[len(best_model_train.index)] = [f"Decision Tree", '0.2', acc_train_7_2, rec_train_7_2]


# <a id="rf"></a>
# # <p style="background-color:#0c4510;font-family:newtimeroman;font-size:100%;color:orange;text-align:center;border-radius:15px 50px; padding:7px">6.8. Random Forest </p>
# 
# [🏠 Tabel of Contents](#tabel)

# In[122]:


# split train and test data by inital test_size=0.2
# stratify used for considering class distribution in spliting data
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=0, stratify=y)


# In[123]:


# Check cross validation on Random Forest model to estimate model performance (Accuracy)
operations = [('RF', RandomForestClassifier())]
pipe8_1 = Pipeline(operations)
Perform_cross_val(pipe8_1, k=10, x=x_train, y=y_train, scoring='accuracy')


# In[124]:


# Check cross validation on RandomForest model to estimate model performance (Recall)
Perform_cross_val(pipe8_1, k=10, x=x_train, y=y_train, scoring='recall')


# In[125]:


# create initial RF model without pruning
rf = RandomForestClassifier()
pipe8_1 = Pipeline([('scaler', StandardScaler()), ('clf', rf)])
acc_test_8_1, acc_train_8_1, rec_test_8_1, rec_train_8_1 = modeling(
    clf=pipe8_1,
    x=x,
    y=y,
    test_size=0.2,
    classes={'Not Accepted':0, 'Accepted':1},
    model_name='RF 1',
    stratify=True)


# In[126]:


# check accuracy, recall and overfitting
print(f"Train Accuracy: {acc_train_8_1}")
print(f"Test Accuracy: {acc_test_8_1}")
print(f"Train Recall: {rec_train_8_1}")
print(f"Test Recall: {rec_test_8_1}")


# It seems that the model tends to overfit here as well, so to solve this problem, we perform parameter tuning for RF:

# In[127]:


# parameter tuning by loops instead grid search because 
# gridsearch is very expensive and Time-consuming for this dataset
from numpy import mean
from numpy import std
from numpy import arange
from sklearn.model_selection import RepeatedStratifiedKFold

# get a list of models to evaluate 
# explore random forest bootstrap sample size
def get_models1():
	print("Explore random forest bootstrap sample size")
	models = dict()
	# explore ratios from 10% to 100% in 10% increments
	for i in arange(0.1, 1.1, 0.1):
		key = f'{i:.1f}'
		# set max_samples=None to use 100%
		if i == 1.0:
			i = None
		models[key] = RandomForestClassifier(max_samples=i)
	return models

# get a list of models to evaluate
# explore random forest number of features effect
def get_models2():
	print("Explore random forest number of features effect")
	models = dict()
	# explore number of features from 1 to 7
	for i in range(1,8):
		models[str(i)] = RandomForestClassifier(max_features=i)
	return models

# get a list of models to evaluate
# explore random forest tree depth effect
def get_models3():
	print("Explore random forest tree depth effect")
	models = dict()
	# consider tree depths from 1 to 7 and None=full
	depths = [i for i in range(1,10)] + [None]
	for n in depths:
		models[str(n)] = RandomForestClassifier(max_depth=n)
	return models
 
# evaluate a given model using cross-validation
def evaluate_model(model, X, y):
	# define the evaluation procedure
	cv = RepeatedStratifiedKFold(n_splits=10, n_repeats=3, random_state=1)
	# evaluate the model and collect the results
	scores = cross_val_score(model, X, y, scoring='recall', cv=cv, n_jobs=-1)
	return scores
 
for func in [get_models1, get_models2, get_models3]:
	# get the models to evaluate
	models = func()
	# evaluate the models and store results
	results, names = list(), list()
	for name, model in models.items():
		# evaluate the model
		scores = evaluate_model(model, x_train, y_train)
		# store the results
		results.append(scores)
		names.append(name)
		# summarize the performance along the way
		print(f">{name:s}, mean:{mean(scores):.3f}, ste:{std(scores):.3f}")
	# plot model performance for comparison
	plt.boxplot(results, labels=names, showmeans=True)
	plt.show()


# <div class="alert alert-block alert-info" style="font-size:14px; font-family:verdana;">
#     📌You may see some warnings during the optimization for invalid configuration combinations. These can be safely ignored.
# </div>
# 
# The results are summarized as follows:
# 
#     Explore random forest bootstrap sample size
#     >0.1, mean:0.763, ste:0.068
#     >0.2, mean:0.824, ste:0.060
#     >0.3, mean:0.850, ste:0.049
#     >0.4, mean:0.859, ste:0.053
#     >0.5, mean:0.867, ste:0.042
#     >0.6, mean:0.867, ste:0.048
#     >0.7, mean:0.876, ste:0.048
#     >0.8, mean:0.879, ste:0.050
#     >0.9, mean:0.878, ste:0.043
#     >1.0, mean:0.877, ste:0.047
# <center><img src='https://i.postimg.cc/W4VN67Hw/11.png' height=100px width=450px></center><br>
# 
#     Explore random forest number of features effect
#     >1, mean:0.778, ste:0.061
#     >2, mean:0.866, ste:0.050
#     >3, mean:0.882, ste:0.047
#     >4, mean:0.885, ste:0.044
#     >5, mean:0.896, ste:0.035
#     >6, mean:0.899, ste:0.039
#     >7, mean:0.896, ste:0.038
# <center><img src='https://i.postimg.cc/ydY728BJ/12.png' height=100px width=450px></center><br>
# 
#     Explore random forest tree depth effect
#     >1, mean:0.000, ste:0.000
#     >2, mean:0.119, ste:0.061
#     >3, mean:0.437, ste:0.086
#     >4, mean:0.658, ste:0.080
#     >5, mean:0.801, ste:0.059
#     >6, mean:0.840, ste:0.054
#     >7, mean:0.865, ste:0.052
#     >8, mean:0.869, ste:0.042
#     >9, mean:0.879, ste:0.044
#     >None, mean:0.877, ste:0.042
# <center><img src='https://i.postimg.cc/RhW4VpW4/13.png' height=100px width=450px></center><br>
# 

# In this case, we can see that by max_sample=None, max_features=7, max_depth=None we have best result

# In[128]:


# create initial RF model without pruning
rf = RandomForestClassifier(
    criterion='entropy',
    n_estimators=100,
    max_samples=None,
    max_features=7,
    max_depth=None,
    class_weight='balanced_subsample',)
pipe8_2 = Pipeline([('scaler', StandardScaler()), ('clf', rf)])
acc_test_8_2, acc_train_8_2, rec_test_8_2, rec_train_8_2 = modeling(
    clf=pipe8_2,
    x=x,
    y=y,
    test_size=0.2,
    classes={'Not Accepted':0, 'Accepted':1},
    model_name='RF 2',
    stratify=True)


# In[129]:


print(f"Train Accuracy: {acc_train_8_2}")
print(f"Test Accuracy: {acc_test_8_2}")
print(f"Train Recall: {rec_train_8_2}")
print(f"Test Recall: {rec_test_8_2}")


# And again, the model tends to overfitting. So we change some of parameter to prevent overfitting and get the best result

# In[130]:


# create initial RF model without pruning
from sklearn.preprocessing import RobustScaler


rf = RandomForestClassifier(
    criterion='entropy',
    n_estimators=150,
    max_samples=None,
    max_features=7,
    max_depth=4,
    class_weight='balanced_subsample',
    oob_score=True
)
pipe8_3 = Pipeline([('scaler', StandardScaler()), ('clf', rf)])
acc_test_8_3, acc_train_8_3, rec_test_8_3, rec_train_8_3 = modeling(
    clf=pipe8_3,
    x=x,
    y=y,
    test_size=0.2,
    classes={'Not Accepted':0, 'Accepted':1},
    model_name='RF 3',
    stratify=True)


# In[131]:


# print result for check overfit
print(f"Train Accuracy: {acc_train_8_3}")
print(f"Test Accuracy: {acc_test_8_3}")
print(f"Train Recall: {rec_train_8_3}")
print(f"Test Recall: {rec_test_8_3}")
print(f"OOB score: {rf.oob_score_}")

rf.fit(x_train,y_train.ravel())
y_train_predicted=rf.predict(x_train)
y_test_predicted=rf.predict(x_test)
cm = confusion_matrix(y_test, y_test_predicted)
plot_confusion_matrix2(cm=cm, classes={'Not Accepted':0, 'Accepted':1}, )
# print(classification_report(y_test, y_test_predicted))
cm = confusion_matrix(y_train, y_train_predicted)
plot_confusion_matrix2(cm=cm, classes={'Not Accepted':0, 'Accepted':1}, )
# print(classification_report(y_train, y_train_predicted))


# In[132]:


from typing import OrderedDict

ensemble_clfs = [
    (
        "RandomForestClassifier, max_features='sqrt'",
        RandomForestClassifier(
            warm_start=True,
            oob_score=True,
            criterion='entropy',
            n_estimators=150,
            max_samples=None,
            max_depth=4,
            class_weight='balanced_subsample',
            max_features='sqrt',
        ),
    ),
    (
        "RandomForestClassifier, max_features='log2'",
        RandomForestClassifier(
            warm_start=True,
            oob_score=True,
            criterion='entropy',
            n_estimators=150,
            max_samples=None,
            max_depth=4,
            class_weight='balanced_subsample',
            max_features="log2",
        ),
    ),
    (
        "RandomForestClassifier, max_features=5",
        RandomForestClassifier(
            warm_start=True,
            oob_score=True,
            criterion='entropy',
            n_estimators=150,
            max_samples=None,
            max_depth=4,
            class_weight='balanced_subsample',
            max_features=5,
        ),
    ),
]

# Map a classifier name to a list of (<n_estimators>, <error rate>) pairs.
error_rate = OrderedDict((label, []) for label, _ in ensemble_clfs)

# Range of `n_estimators` values to explore.
min_estimators = 15
max_estimators = 150

for label, clf in ensemble_clfs:
    for i in range(min_estimators, max_estimators + 1, 5):
        clf.set_params(n_estimators=i)
        clf.fit(x_train, y_train)

        # Record the OOB error for each `n_estimators=i` setting.
        oob_error = 1 - clf.oob_score_
        error_rate[label].append((i, oob_error))

# Generate the "OOB error rate" vs. "n_estimators" plot.
for label, clf_err in error_rate.items():
    xs, ys = zip(*clf_err)
    plt.plot(xs, ys, label=label)

plt.xlim(min_estimators, max_estimators)
plt.xlabel("n_estimators")
plt.ylabel("OOB error rate")
plt.legend(loc="upper right")
plt.show()


# It doesn't seem overfit, so there is no problem. Very Nice result, because only 7 of the customers who accepted the bank loan were wrongly predicted 🥳

# In[133]:


# check improve model by change test_size
change_test_size(pipe8_3, x, y, 'RF')


# > So best model by Decision Tree algorithm is the model by test_size = 0.2:

# In[134]:


# add best model and its accuracy and recall
best_model_test.loc[len(best_model_test.index)] = [f"Random Forest", '0.2', acc_test_8_3, rec_test_8_3]
best_model_train.loc[len(best_model_train.index)] = [f"Random Forest", '0.2', acc_train_8_3, rec_train_8_3]


# <a id="compare"></a>
# # <p style="background-color:#0c4510;font-family:newtimeroman;font-size:120%;color:orange;text-align:center;border-radius:15px 50px; padding:7px">7. Comparing Models </p>
# 
# [🏠 Tabel of Contents](#tabel)

# Now, after checking the performance of several different models, the following results were obtained:

# In[135]:


# tabel of best models by Test_Accuracy
best_model_test.sort_values(by=['Test_Recall'], ascending=False).reset_index(drop=True).style.background_gradient(cmap='summer_r')


# <div class="alert alert-block alert-success" style="font-size:14px; font-family:verdana;">
#     ✅ We analyzed the Personal Loan campaign data using EDA and by using different models. Finally, according to the above table, the model made with Random Forest is the best model for the intended purpose (lower recall) by Test_Rcall=0.97, Test_Accuracy=0.96.🤩
# </div>

# <a id="visualize"></a>
# # <p style="background-color:#0c4510;font-family:newtimeroman;font-size:120%;color:orange;text-align:center;border-radius:15px 50px; padding:7px">8. Visualization Final Model </p>
# 
# [🏠 Tabel of Contents](#tabel)

# In[136]:


x_visual = df.drop('Personal Loan', axis=1)
y_visual = df['Personal Loan'].values.reshape(-1,1)


# In[137]:


df


# In[138]:


plt.show()
x_train, x_test, y_train, y_test = train_test_split(x_visual, y_visual, test_size=0.2, random_state=0, stratify=y_visual)
pipe8_3.fit(x_train, y_train.ravel())
y_pred_test = pipe8_3.predict(x_test)
y_pred_train = pipe8_3.predict(x_train)
x_test.insert(11,'Personal Loan', y_test)
x_test.insert(12, 'Pred', y_pred_test)
x_train.insert(11,'Personal Loan', y_train)
x_train.insert(12, 'Pred', y_pred_train)
cols =['Age', 'Experience', 'Family', 'CCAvg', 'Education', 'Mortgage', 'Securities Account', 'CD Account', 'Online', 'CreditCard']

for col in cols:
    fig = px.scatter_3d(
        data_frame= x_test,
        x=x_test.Income,
        y=x_test[col],
        z=x_test['Personal Loan'],
        color=y_pred_test,
        color_discrete_map={0:'red', 1:'orange'},
        template='ggplot2',
        hover_name='Age',
        # hover_data=
        opacity=0.6,
        # symbol='Transmission',
        # symbol_map=
        # log_x=True,
        # log_z=True,
        height=700,
        title=f'Visualization Performance of Model in Predicting')

    pio.show(fig)


# In[139]:


fn_rows_train = x_train[(x_train['Personal Loan'] == 1) & (x_train['Pred'] == 0)]
fn_rows_test = x_test[(x_test['Personal Loan'] == 1) & (x_test['Pred'] == 0)]
fn_rows = pd.concat([fn_rows_train, fn_rows_test])
fn_rows


# #### Conclusion
# 
# Accoring to above plots and table:
#  - Most of the data are predicted correctly and there are few errors
# 
#  - Our final model predicted 7 customers wrongly. On analyzing the Income , Education,Family , we can see the Income is not in range of High income group (more than $10thousand) and education is 1 (undergrad) for most of them and there CCavg is also low. These cases are some exceptions.
# 
#  - So for this bank we can have different profiles for customers.
#  - **High Profile Clients:** Higher Income,Advanced/Graduate level Education, 3-4 Family members,high CCAvg
#  - **Average Profile:** Medium Income,Graduate level Education, 3-4 Family members,medium CCAvg
#  - **Low Profile:** Lower income,undergrads Education,3-4 Family members,low CCAvg
#  - CCavg and Mortages can also be looked upon as based on EDA and this features also play some role in likelihood of buy loan.
#  - We can 1st target high profile customers , by providing them with a personal relationship managers who can address there concerns and can pursue them to buy loan from the bank with completive interest rates.
#  - Our 2nd target would be Medium profile customers.
#  - The model cannot identify well if there are some exceptional cases when low profile customer is ready to buy a personal loan.
# 

# <a id="predict"></a>
# # <p style="background-color:#0c4510;font-family:newtimeroman;font-size:120%;color:orange;text-align:center;border-radius:15px 50px; padding:7px">9. Prediction Sample Data</p>
# 
# [🏠 Tabel of Contents](#tabel)

# In[140]:


df


# In[141]:


# fit final model on all of data (train + test)
final_model = pipe8_3
final_model.fit(x_visual, y_visual)

# define sample data
sample = pd.DataFrame({'Age':[42], 'Experience':[16], 'Income':[30/12], 'Family':[3], 'CCAvg':[1.2], 'Education':[3], 'Mortgage':[0], 'Securities Account':[1], 'CD Account':[0], 'Online':[1], 'CreditCard':[1],})
print(f"Age: {sample['Age'].values[0]}\n"
      f"Experience: {sample['Experience'].values[0]}\n"
      f"Income: {sample['Income'].values[0]}\n"
      f"Family: {sample['Family'].values[0]}\n"
      f"CCAvg: {sample['CCAvg'].values[0]}\n"
      f"Education: {sample['Education'].values[0]}\n"
      f"Mortgage: {sample['Mortgage'].values[0]}\n"
      f"Securities Account: {sample['Securities Account'].values[0]}\n"
      f"CD Account: {sample['CD Account'].values[0]}\n"
      f"Online: {sample['Online'].values[0]}\n"
      f"CreditCard: {sample['CreditCard'].values[0]}\n")

# predict sample data
result = final_model.predict(sample)

print('='*38)
print(f"Predict whether the customer will accept a personal loan? (0:No & 1:Yes): {result}")


# <br><center><img src='https://www.gifcen.com/wp-content/uploads/2021/05/the-end-gif-12.gif' height=100px width=300px></center><br>

# In[148]:


# fit final model on all of data (train + test)
final_model = pipe8_3
final_model.fit(x_visual, y_visual)

# define sample data
sample = pd.DataFrame({'Age':[29], 'Experience':[3], 'Income':[100/12], 'Family':[0], 'CCAvg':[1.2], 'Education':[5], 'Mortgage':[0], 'Securities Account':[1], 'CD Account':[0], 'Online':[1], 'CreditCard':[1],})
print(f"Age: {sample['Age'].values[0]}\n"
      f"Experience: {sample['Experience'].values[0]}\n"
      f"Income: {sample['Income'].values[0]}\n"
      f"Family: {sample['Family'].values[0]}\n"
      f"CCAvg: {sample['CCAvg'].values[0]}\n"
      f"Education: {sample['Education'].values[0]}\n"
      f"Mortgage: {sample['Mortgage'].values[0]}\n"
      f"Securities Account: {sample['Securities Account'].values[0]}\n"
      f"CD Account: {sample['CD Account'].values[0]}\n"
      f"Online: {sample['Online'].values[0]}\n"
      f"CreditCard: {sample['CreditCard'].values[0]}\n")

# predict sample data
result = final_model.predict(sample)

print('='*38)
print(f"Predict whether the customer will accept a personal loan? (0:No & 1:Yes): {result}")


# In[149]:



# In[ ]:




