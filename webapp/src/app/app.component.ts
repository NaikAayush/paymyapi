import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { EthersService } from './services/ethers/ethers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'webapp';

  constructor(
    private ethersService: EthersService,
    private readonly apollo: Apollo
  ) {}
  // async ngOnInit() {
  //   // await this.ethersService.initEthers();
  //   // await this.ethersService.signMessage('hi');
  // }
  ngOnInit(): void {
    this.apollo
      .query({
        query: gql`
          {
            hello(id: "123") {
              name
            }
            bye
          }
        `,
      })
      .subscribe(console.log);
  }
}
