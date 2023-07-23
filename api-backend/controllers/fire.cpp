#include <bits/stdc++.h>

 
using namespace std;
 
typedef long long int ll;

#define A 1000000007ll
#define C 1000000000000000000ll
#define M 4000

#define ve vector

int main() 
{
    ll n,k;
    cin>>n>>k;
    ve<ll> a(n);
    for(ll i=0;i<n;i++)
        cin>>a[i];
    if(n==1 || n==k)
    {
        cout<<0;
        return 0;
    }
    ll l=0,r=2ll*A,ans=r;
    while(l<=r)
    {
        ll mid=(l+r)/2;
        ve<ll> dp(n,C);
        dp[0]=0;
        for(ll i=1;i<n;i++)
        {
            dp[i]=i;
            for(ll j=0;j<i;j++)
            {
                ll x=abs(a[j]-a[i])-1;
                if((mid!=0 && (x/mid)<=i-j-1) || (mid==0 && a[i]==a[j]))
                    dp[i]=min(dp[i],dp[j]+i-j-1);
            }
        }
        ll y=dp[n-1];
        for(ll i=n-2,j=1;i>=0;i--,j++)
            y=min(y,dp[i]+j);
        if(y>k)
            l=mid+1;
        else
        {
            ans=min(ans,mid);
            r=mid-1;
        }
    }
    cout<<ans;
    return 0;
}