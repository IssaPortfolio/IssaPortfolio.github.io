#include <iostream>
#include <string>
#include <fstream>
#include <iomanip>
#include <sstream>
#include <algorithm> 
#include <cmath>

using namespace std;

const string INPUTFILENAME = "Budget.txt";
const int NUM_BILLS = 5; // (JS) Constant used for condition in array
const int BUDGET_AMOUNTS = 1; // (JS) Const used for loop condition in GetBudgetData
const char emptyChar = ' '; // (JS) Used in GetBudgetData function for getline function end condition

const double ZERO_OUT_COST = 0.00; // (AM) Used to zero out the cost of somthing

// (Everyone) Organizing output data in to a struct 
struct BudgetInfo
{
    // (Andrew Majewski) Data variables for "GetCarExpenditures"
    int gasStationVisits;
    double gasCostTotal;
    double gasCostAverage;
    double totalCarCost;

    // Justin Smith
    double foodBudgetAmount;
    double carBudgetAmount;

    // Issa Habeeb
    double groceries_Cost = 0;
    int groceries_Trips = 0;

    double eating_Out_Cost = 0;
    int eating_Out_Trips = 0;

    double total_Spend = 0;
    int total_Trips = 0;

    double groceries_Average_Per_Trip;
    double eating_Out_Average_Per_Trip;

    // Everyone
    double budget_total;
    double actual_total;
};


// Function by Justin Smith
// (JS) This function will read in data from the specified file and assign the data to two arrays
// (JS) One array will hold the budget bill type and one will hold the decimal amount
// (JS) They may be operated on as a parallel set of arrays
bool GetBudgetData(string INPUTFILENAME, string Name[NUM_BILLS], double Amount[NUM_BILLS], BudgetInfo& BudgetOut) // (JS) Input data from Budget.txt into two 1-dimensional array 
{
    ifstream InputStream;
    InputStream.open(INPUTFILENAME);
    // (JS) Checks if file opened correctly
    if (!InputStream)
    {
        cout << "'" << INPUTFILENAME << "' file could not be found\n" << endl;
        system("pause");
        return false;
    }
    else
    {
        cout << "Loading file: '" << INPUTFILENAME << "'...\n" << endl;
        cout << setw(100) << setfill('-') << "\n" << endl;
    }

    string line; // (JS) declare string data type for use in getline function

    // (JS) Use a nested for loop for data input.
    // (JS) Outer loop will input the bill name and assign it to the ith element of name
    for (int i = 0; i < NUM_BILLS; i++) // (JS) Num bills is a const declared at beginning
    {
        InputStream >> Name[i];
        getline(InputStream, line, emptyChar);

        // (JS) Inner loop will input the budget amount for the ith element of Amount
        for (int j = 0; j < BUDGET_AMOUNTS; j++) // (JS) Budget amounts is declared as a const.
        {
            InputStream >> Amount[i];
            // (JS) Getline function moves the curser past the newline character...moves to the next line
            getline(InputStream, line);
            // (JS) Decision structure to assign amounts to food or car for operation in function BudgetTotals
            if (Name[i] == "Food")
            {
                BudgetOut.foodBudgetAmount = Amount[i];
            }
            else if (Name[i] == "Car")
            {
                BudgetOut.carBudgetAmount = Amount[i];
            }
        }
    }


    InputStream.close(); // (JS) Close file stream

    return true; // (JS) Return true to indicate file read success
}


// (Andrew Majewski) I could not find a method that I liked to uppercase a string so I made my own function for it.
// In case if anyone wants to use this you set it up the variale as such: upper = UpperCaseThe String(input);.

// (Andrew Majewski) Function code Contrabution
void GetCarExpenditures(BudgetInfo& BudgetOut)
{
    cout << "CAR EXPENDITURES\n" << endl;
    // (AM) variables
    int numberStationTrips = 0; // (AM)Value to which the number of times the user went to the gas Station
    double totalGasCost = 0.00; // (AM)The total cost of gass spent at the gas sation(s).
    double averageGasCost = 0.00; // (AM)The avrage cost of gas for the mounth
    double MaintainceTotalCost = 0.00;
    double accessoriesTotalCost = 0.00;
    double totalCarCost = 0.00;
    bool carMaintenance = false; // If user did any car maintenance this mouth
    bool maintenanceValid = false;
    bool boughtCarAccessories = false;
    bool accessoriesValid = false;
    string userInput;
    string inputUpper;
    // (AM)User prompts and input
        // (AM)Gas Information
    cout << "How many times have you been to the gas station this month?: ";
    cin >> numberStationTrips;

    cout << "What is the total amount you paid for at the gas station?: $";
    cin >> totalGasCost;

    averageGasCost = totalGasCost / static_cast<double>(numberStationTrips); // 
    cout << "The average cost of gas for the month was $" << averageGasCost << endl << endl;

    // (AM) Maintenance questions
        // (AM) Asking user if they have done any Maintenance to their car.
    while (maintenanceValid == false)
    {
        cout << "Have you done any maintenance this month? " << endl;
        cout << "(Type yes or no): ";
        userInput.erase();
        inputUpper.erase();
        cin >> userInput;
        // (AM)Uppercasing the string
        transform(userInput.begin(), userInput.end(), userInput.begin(), ::toupper);
        // (AM) if yes it will enable question realated to Maintenance
        if (userInput == "YES" || userInput == "Y")
        {
            carMaintenance = true;
            maintenanceValid = true;
        }
        else if (userInput == "NO" || userInput == "N")
        {
            carMaintenance = false;
            maintenanceValid = true;
        }
        else
        {
            cout << "Please type the specified response!" << endl;
        }
    }
    if (carMaintenance == true)
    {
        cout << "How much was the Maintenance bill?" << endl;
        cout << "This includes washing, regular repairs, oil changes... etc.)" << endl;
        cin >> MaintainceTotalCost;

    }
    else  if (maintenanceValid == false)
    {
        MaintainceTotalCost = ZERO_OUT_COST;
    }
    cout << endl;
    while (accessoriesValid == false)
    {
        cout << "Have you bought anything for your car such as car sent diffuser or phone holder. " << endl;
        cout << "(Type yes or no):";
        userInput.erase();
        inputUpper.erase();
        cin >> userInput;

        // (AM)Uppercasing the string
        transform(userInput.begin(), userInput.end(), userInput.begin(), ::toupper);

        if (userInput == "YES" || userInput == "Y")
        {
            boughtCarAccessories = true;
            accessoriesValid = true;
        }
        else if (userInput == "NO" || userInput == "N")
        {
            boughtCarAccessories = false;
            accessoriesValid = true;
        }
        else
        {
            cout << "Please type the specified response!" << endl;
        }
    }
    if (boughtCarAccessories == true)
    {
        cout << "How much was the total cost of all the accessories? $";
        cin >> accessoriesTotalCost;
    }
    else  if (boughtCarAccessories == false)
    {
        accessoriesTotalCost = ZERO_OUT_COST;
    }
    totalCarCost = totalGasCost + MaintainceTotalCost + accessoriesTotalCost;
    cout << endl;
    cout << "This Concludes the car portion of the budget program.\n" << endl;

    // (AM) BudgetOut values
    BudgetOut.gasCostTotal = totalGasCost;
    BudgetOut.gasCostAverage = averageGasCost;
    BudgetOut.gasStationVisits = numberStationTrips;
    BudgetOut.totalCarCost = totalCarCost;
}

// Entire function by Issa Habeeb
void GetFood(BudgetInfo& budget_Data)
{
    cout << "FOOD EXPENDITURES\n" << endl;
    // Ask how much was spend on groceries
    cout << "How much have you spend on Groceries this month?: $";
    cin >> budget_Data.groceries_Cost;

    // Checks if they spend over $0, if so, ask how many trips
    if (budget_Data.groceries_Cost > 0)
    {
        cout << "How many trips did you make to the groceries this month?: ";
        cin >> budget_Data.groceries_Trips;
    }

    cout << endl;

    // Ask how much was spend on eating out
    cout << "How much have you spend on eating out this month?: $";
    cin >> budget_Data.eating_Out_Cost;

    // Checks if they spend over $0, if so, ask how many trips
    if (budget_Data.eating_Out_Cost > 0)
    {
        cout << "How many eating out trips did you make?: ";
        cin >> budget_Data.eating_Out_Trips;
    }

    cout << endl;

    // Checks if they spend over $0, if so, prints groceries spend average per trip
    if (budget_Data.groceries_Cost > 0)
    {
        budget_Data.groceries_Average_Per_Trip = budget_Data.groceries_Cost / budget_Data.groceries_Trips;
        cout << "Groceries Average Spend Per Trip: $" << budget_Data.groceries_Average_Per_Trip << endl;
    }
    // Checks if they spend over $0, if so, prints eating out spend average per trip
    if (budget_Data.eating_Out_Cost > 0)
    {
        budget_Data.eating_Out_Average_Per_Trip = budget_Data.eating_Out_Cost / budget_Data.eating_Out_Trips;
        cout << "Eating Out Average Spend Per Trip: $" << budget_Data.eating_Out_Average_Per_Trip << endl;
    }

    cout << endl;

    // Adds total spend (groceries and eating out)
    budget_Data.total_Spend = budget_Data.groceries_Cost + budget_Data.eating_Out_Cost;
    // Adds total trips (groceries and eating out)
    budget_Data.total_Trips = budget_Data.groceries_Trips + budget_Data.eating_Out_Trips;
}

void BudgetTotals(BudgetInfo& BudgetOut, const string budgetName[NUM_BILLS], const double budgetAmount[BUDGET_AMOUNTS])
{
    // All file output done by Issa Habeeb

    // (IH) Makes sure previous function cout statements are printed before 'system("cls")' function
    char printResults = ' ';
    while (true)
    {
        if ((printResults != 'N') && (printResults != 'n'))
        {
            cout << "Press 'N' to print out budget and expenses results: ";
            cin >> printResults;
        }
        else
            break;
    }

    // File for output (creates it if does not exist)
    const string OUTFILESTREAM = "BudgetOut.txt";
    ofstream fOutStream;
    fOutStream.open(OUTFILESTREAM);  // Opens file to output to
    fOutStream << fixed << showpoint << setprecision(2);

    system("cls");

    string budgetLine;
    ostringstream snDouble;
    snDouble.precision(2);
    cout << fixed << showpoint << setprecision(2);
    cout << "Budget Text File:" << endl << endl;

    // (JS) 
    for (int i = 0; i < NUM_BILLS; i++)
    {
        BudgetOut.budget_total += budgetAmount[i];
        snDouble << "| " << budgetName[i] << " $" << fixed << budgetAmount[i] << " ";
    }
    budgetLine += snDouble.str() + "| "; // (AM) Format Edit
    cout << setw(budgetLine.length() - 1) << setfill('-') << '-' << endl; // (AM) Format Edit
    fOutStream << setw(budgetLine.length() - 1) << setfill('-') << '-' << endl;

    cout << budgetLine << endl;// (AM) Format Edit
    fOutStream << budgetLine << endl;

    cout << setw(budgetLine.length() - 1) << setfill('-') << '-' << endl; // (AM) Format Edit
    fOutStream << setw(budgetLine.length() - 1) << setfill('-') << '-' << endl;

    // (JS) Determine the actual spent amount
    BudgetOut.actual_total = BudgetOut.budget_total - (BudgetOut.foodBudgetAmount + BudgetOut.carBudgetAmount);
    BudgetOut.actual_total = BudgetOut.actual_total + BudgetOut.totalCarCost + BudgetOut.total_Spend;

    // (JS) List the allocated budget, actual spent, and over/under
    cout << "\nTotal allocated budget: $" << BudgetOut.budget_total;
    fOutStream << "\nTotal allocated budget: $" << BudgetOut.budget_total;

    cout << "\nTotal actually spent: $" << BudgetOut.actual_total << endl;
    fOutStream << "\nTotal actually spent: $" << BudgetOut.actual_total << endl;

    // (JS) Determine if they were over/under their budget
    if (BudgetOut.actual_total < BudgetOut.budget_total)
    {
        cout << "Your total budget was under budget this month by: $" << BudgetOut.budget_total - BudgetOut.actual_total << endl << endl;
        fOutStream << "Your total budget was under budget this month by: $" << BudgetOut.budget_total - BudgetOut.actual_total << endl << endl;
    }
    else if (BudgetOut.actual_total > BudgetOut.budget_total)
    {
        cout << "Your total budget was over budget this month by: $" << BudgetOut.actual_total - BudgetOut.budget_total << endl << endl;
        fOutStream << "Your total budget was over budget this month by: $" << BudgetOut.actual_total - BudgetOut.budget_total << endl << endl;
    }
    else
    {
        cout << "You were spot on with your budget this month" << endl << endl;
        fOutStream << "You were spot on with your budget this month" << endl << endl;
    }
    cout << setw(budgetLine.length() - 1) << setfill('-') << '-' << endl << endl;
    fOutStream << setw(budgetLine.length() - 1) << setfill('-') << '-' << endl << endl;

    // (JS) Output the data regarding food trips
    cout << "You spent $" << BudgetOut.total_Spend << " on food this month." << endl;
    fOutStream << "You spent $" << BudgetOut.total_Spend << " on food this month." << endl;

    cout << "An average of $" << BudgetOut.total_Spend / BudgetOut.total_Trips << " was spent on food." << endl;
    fOutStream << "An average of $" << BudgetOut.total_Spend / BudgetOut.total_Trips << " was spent on food." << endl;

    cout << "Number of trips made for food: " << BudgetOut.total_Trips << endl << endl;
    fOutStream << "Number of trips made for food: " << BudgetOut.total_Trips << endl << endl;

    cout << setw(budgetLine.length() - 1) << setfill('-') << '-' << endl << endl;
    fOutStream << setw(budgetLine.length() - 1) << setfill('-') << '-' << endl << endl;

    // (JS) Output the comparison of food over/uder budget
    cout << "Your budget food is: $" << BudgetOut.foodBudgetAmount << endl;
    fOutStream << "Your budget food is: $" << BudgetOut.foodBudgetAmount << endl;

    cout << "You spent $" << BudgetOut.total_Spend << " for food." << endl;
    fOutStream << "You spent $" << BudgetOut.total_Spend << " for food." << endl;
    if (BudgetOut.total_Spend < BudgetOut.foodBudgetAmount)
    {
        cout << "You were under budget this month by: $" << BudgetOut.foodBudgetAmount - BudgetOut.total_Spend << endl << endl;
        fOutStream << "You were under budget this month by: $" << BudgetOut.foodBudgetAmount - BudgetOut.total_Spend << endl << endl;
    }
    else if (BudgetOut.foodBudgetAmount < BudgetOut.total_Spend)
    {
        cout << "You were over budget this month by: $" << BudgetOut.total_Spend - BudgetOut.foodBudgetAmount << endl << endl;
        fOutStream << "You were over budget this month by: $" << BudgetOut.total_Spend - BudgetOut.foodBudgetAmount << endl << endl;
    }
    else
    {
        cout << "You met your budget exactly!" << endl << endl;
        fOutStream << "You met your budget exactly!" << endl << endl;
    }
    cout << setw(budgetLine.length() - 1) << setfill('-') << '-' << endl << endl;
    fOutStream << setw(budgetLine.length() - 1) << setfill('-') << '-' << endl << endl;

    // (AM) gas average
    cout << "The number of trips to the gas station is: " << BudgetOut.gasStationVisits << endl;
    fOutStream << "The number of trips to the gas station is: " << BudgetOut.gasStationVisits << endl;

    cout << "Gas average of $" << BudgetOut.gasCostAverage << " was spent on your vehicle." << endl << endl;
    fOutStream << "Gas average of $" << BudgetOut.gasCostAverage << " was spent on your vehicle." << endl << endl;

    cout << setw(budgetLine.length() - 1) << setfill('-') << '-' << endl << endl;
    fOutStream << setw(budgetLine.length() - 1) << setfill('-') << '-' << endl << endl;

    // (AM) Output comparison
    cout << "Your budget for vehicle purchases is: $" << BudgetOut.carBudgetAmount << endl;
    fOutStream << "Your budget for vehicle purchases is: $" << BudgetOut.carBudgetAmount << endl;

    cout << "You spent $" << BudgetOut.totalCarCost << " on your car." << endl;
    fOutStream << "You spent $" << BudgetOut.totalCarCost << " on your car." << endl;
    if (BudgetOut.totalCarCost > BudgetOut.total_Spend)
    {
        cout << "You went under budget by: $" << abs(BudgetOut.totalCarCost - BudgetOut.carBudgetAmount) << endl << endl;
        fOutStream << "You went under budget by: $" << abs(BudgetOut.totalCarCost - BudgetOut.carBudgetAmount) << endl << endl;
    }
    else if (BudgetOut.totalCarCost < BudgetOut.total_Spend)
    {
        cout << "You went over budget by: $" << abs(BudgetOut.totalCarCost - BudgetOut.carBudgetAmount) << endl << endl;
        fOutStream << "You went over budget by: $" << abs(BudgetOut.totalCarCost - BudgetOut.carBudgetAmount) << endl << endl;
    }
    else
    {
        cout << "You met your budget exactly!" << endl << endl;
        fOutStream << "You met your budget exactly!" << endl << endl;
    }

    cout << setw(budgetLine.length() - 1) << setfill('-') << '-' << endl << endl;
    fOutStream << setw(budgetLine.length() - 1) << setfill('-') << '-' << endl << endl;

    fOutStream.close();
}
// BUDGET_AMOUNTS


int main()
{
    cout << fixed << showpoint << setprecision(2);

    // (JS) Declare Arrrays
    string budgetName[NUM_BILLS];
    double budgetAmount[NUM_BILLS];

    BudgetInfo BudgetOut = {};

    GetBudgetData(INPUTFILENAME, budgetName, budgetAmount, BudgetOut);  // (JS) Input file data into array of structs
    GetCarExpenditures(BudgetOut);
    cout << setw(100) << setfill('-') << "\n" << endl; // (IH) Indicate end of function
    GetFood(BudgetOut);
    BudgetTotals(BudgetOut, budgetName, budgetAmount);

    system("pause");
    return 0;

}