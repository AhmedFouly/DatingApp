import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from 'src/app/models/member';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  member: Member | undefined;
  user: User | null = null;
  @ViewChild('editForm') editForm: NgForm | undefined;

  //For warning user from changing the website without saving.
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any){
    if(this.editForm?.dirty){
      $event.returnValue = true;
    }
  }

  constructor(private accountService: AccountService,
     private membersService: MembersService, private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user=> this.user = user
    })
   }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    if(!this.user)return;
    this.membersService.getMember(this.user.username).subscribe({
      next: member => this.member = member 
    })
  }

  updateMember(){
    this.membersService.updateMember(this.editForm?.value).subscribe({
      next: _ => {
        this.toastr.success('Profile Updated Successfully');
        this.editForm?.reset(this.member);
      }
    });
  }
}
