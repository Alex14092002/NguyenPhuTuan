//Overriding unnecessary props: in the Props interface
//  Use "any" data type for blockchain :  replace string
// Using any in tyscript reduces type checking and causes errors that can be avoided; the data type should be clearly specified. 
// Repeat too many times and create many arrays (sortedBalances)
// Instead of iterating over the array multiple times, it is recommended to do it the same time and create the resulting array.


//This is the improved code : 

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface WalletPageProps {
  children?: React.ReactNode;
  
}

const WalletPage: React.FC<WalletPageProps> = (props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100;
      case 'Ethereum':
        return 50;
      case 'Arbitrum':
        return 30;
      case 'Zilliqa':
      case 'Neo':
        return 20;
      default:
        return -99;
    }
  };

  const formattedBalances = useMemo(() => {
    const sortedBalances = balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        return balancePriority > -99 && balance.amount <= 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return leftPriority > rightPriority ? -1 : rightPriority > leftPriority ? 1 : 0;
      });

    return sortedBalances.map((balance: WalletBalance) => ({
      ...balance,
      formatted: balance.amount.toFixed(),
    }));
  }, [balances, prices]);

  return (
    <div {...rest}>
      {formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
          <WalletRow    
            className={classes.row}
            key={index}
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.formatted}
          />
        );
      })}
    </div>
  );
};
